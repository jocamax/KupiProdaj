import React from 'react'
import Post from '../../components/post/Post'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './profile.css'
import Img from '../../components/img/profile-placeholder.png'
import { useEffect } from 'react'
import {storage, db} from '../../firebase.config'
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import { getDoc, doc, updateDoc, collection, query, where, orderBy, getDocs, deleteDoc } from 'firebase/firestore'


const Profile = () => {
  const auth = getAuth()
  const [posts, setPosts] = useState(null)
  const navigate = useNavigate('')
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    uid: auth.currentUser.uid
  })
  const {name, email} = formData
  const [img, setImg] = useState('')
  const [user, setUser] = useState({})

  useEffect(()=>{
     getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
       if(docSnap.exists){
         setUser(docSnap.data())
       }
     })
    if(img){
      const uploadImg = async () => {
        const imgRef = ref(storage, `avatar/${new Date().getTime} - ${img.name}`)
      try {
        const snap = await uploadBytes(imgRef, img)
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: url,
          avatarPath: snap.ref.fullPath,
        });
  
        setImg("");
      } catch (error) {
        console.log(error.message);
      }
   
    }
    uploadImg()
    }
  }, [img])

  useEffect(()=>{
    const fetchPosts = async() =>{
      const postsRef = collection(db, 'posts')
      const q = query(
        postsRef, 
        where('userRef', '==', auth.currentUser.uid), 
        orderBy('timestamp', 'desc'))
      
        const querySnap = await getDocs(q)
  
        let posts = []
  
        querySnap.forEach((doc)=>{
          return posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setPosts(posts)
    }
    fetchPosts()
  }, [auth.currentUser.uid])
  
  const onDelete= async (postId) =>{
    if(window.confirm('Da li sigurno zelis da obrises ovaj post?')) {
      await deleteDoc(doc(db, 'posts', postId))
    }
    else{
      return
    }
    const updatePost = posts.filter((post)=>post.id !== postId)
    setPosts(updatePost)
    alert('Posts je uspesno obrisan')
  
  }

  const onLogout = ()=>{
    auth.signOut()
    navigate('/')
  }

  return (
    <div className="">
      <div className='profileDetailsImage'>
        <div className='profileImage'>
        <img className='profileImg' src={user.avatar || Img} alt="avatar"/>
        </div>
        
        <div className='changeImageForm'>  
        <label htmlFor="photo">Promeni profilnu sliku</label>
        <input 
        type="file"
        accept='image/*'
        style={{display: 'none'}}
        id= 'photo'
        onChange={(e)=> setImg(e.target.files[0])}
        />
      </div>
    </div>

    <div className='blueLine'/>
    <div className='containerProfile'>
    <div>
        
    <div className='profileDetails'>
      <p className='profileEmail'>Ime: {name}</p>
      <form className='profileForm'>
      </form>
      <p className='profileEmail'>Email</p>
      <p className='profileEmail'>{email}</p>
    </div>
    <div className='profileButtons'>
      <Link to='/create-post'>
      <button className='btn'>Kreiraj post</button>
      </Link>
      <button className='btn logout' type='button' onClick={onLogout}>Log Out</button>
    </div>
    </div>
    </div>
    <div className='mojiPostovi'>

    <h2>Moji postovi:</h2>
    <div className='posts-grid'>
    {posts?.map((post)=>{
      return <Post
      post={post.data} 
      id={post.id} 
      key={post.id}
      onDelete={()=>onDelete(post.id)}
      />
})}
      </div>
   </div>  
  </div>
  )
}

export default Profile