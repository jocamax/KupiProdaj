import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {db} from '../../firebase.config'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import './commentForm.css'
const CommentForm = ({id}) => {
  const navigate = useNavigate()
  const isMounted = useRef(true)
    const auth = getAuth()
 
    const [formData, setFormData] = useState({
      commentText: '',
      displayName: auth.currentUser.displayName,
      postId: id,
  })



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
  

    return ()=>{
        isMounted.current = false
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[isMounted] )

    const onSubmit = async (e)=>{
      e.preventDefault()
      const formDataCopy = {
        ...formData,
        timestamp: serverTimestamp()
      }
      
       const docRef = await addDoc(collection(db, 'comments'),
       formDataCopy)
      
      console.log(id);
      console.log('komentar je postavljen');
      setFormData({
        commentText: '',
      })
  
    }

    const onMutate = (e) => {
      let boolean = null

      setFormData((prevState) => ({
        ...prevState,
        [e.target.id] : boolean ?? e.target.value
    }))
    }
  
    
  return (
    <div>
        <form action="" onSubmit={onSubmit}>
        <input type="text" 
         placeholder='Unesite komentar'
         className='commentForm'
         id='commentText'
         value={formData.commentText}
         onChange={onMutate}
         required
         />
        <button className='btn' type='submit'>Objavi komentar</button>
        </form>

    </div>
  )
}

export default CommentForm