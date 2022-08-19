import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import {db} from '../../firebase.config'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import './createPost.css'
import { motion } from 'framer-motion';

const CreatePost = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        category: 'Ostalo',
        text: '',
        pending:'true',
        ime: auth.currentUser.displayName,
        images: {},
        grad: ''
    })

    const {
      category,
      text,
      // pending,
      // ime,
      images,
      grad,
    } = formData

    useEffect(()=>{
      if(isMounted){
          onAuthStateChanged(auth, (user) => {
              if(user){
                  setFormData({...formData, userRef: user.uid})
              } else{
                  navigate('/sign-in')
              }
          })
      }


      setLoading(false)

      return ()=>{
          isMounted.current = false
      }
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[isMounted] )

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(images.length > 4){
      setLoading(false)
      alert('Postavili ste preko 4 slike, to nije dozvoljeno')
      return
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }
     const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      alert('slike nisu postavljene')
      return
    })
    
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp()
    }

    delete formDataCopy.images
    const docRef = await addDoc(collection(db, 'posts'),
    formDataCopy)

    setLoading(false)
    console.log('Post je postavljen');
    navigate(`/`)
    
  }

  const onMutate = (e) => {
    let boolean = null
    if(e.target.files){
      setFormData((prevState)=>({
          ...prevState,
          images: e.target.files
      }))
  }

  if(!e.target.files){
    setFormData((prevState) => ({
        ...prevState,
        [e.target.id] : boolean ?? e.target.value
    }))
}
  }
  if(loading){
    return <h1>LOADING....</h1>
 }

  return (
    <motion.div initial='hidden' animate='visible'
    variants={{
      hidden: {
        scale: .95,
        opacity: 0
      },
      visible: {
        scale:1,
        opacity:1,
        transition: {
          delay: .1
        }
      }
    }}
    > 
    <div className='createPost-container'>
       <form onSubmit={onSubmit}>
          <label className='label'>Kreirajte oglas</label>
          <label htmlFor="">Grad</label>
          <input 
          type="text"
          placeholder='Grad'
          className='input'
          id='grad'
          value={grad}
          onChange={onMutate}
          required
          />
          <label htmlFor="">Kategorija</label>
           <input 
          type="text"
          placeholder='Kategorija'
          className='input'
          id='category'
          value={category}
          onChange={onMutate}
          required
          />
          <label htmlFor="">Slike</label>
          <input
            className='input'
            type='file'
            id='images'
            onChange={onMutate}
            min='1'
            max='4'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <textarea 
          className='inputText'
          type='text'
          placeholder='Ovde upisite svoj tekst'
          id='text'
          value={text}
          onChange={onMutate}
          min='5'
          max='200'     
          required
          />
          <button className='create-btn' type='submit'>Postavi post</button>
        </form>
    </div>
    </motion.div>
  )
}

export default CreatePost