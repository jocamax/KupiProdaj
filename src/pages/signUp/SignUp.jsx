import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {db} from '../../firebase.config'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import { motion } from 'framer-motion';

import './signUp.css'

const SignUp = () => {
  const auth = getAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    uid: '',
  })

  const {email, password, name, uid } = formData
  const navigate = useNavigate()

  const onChange = (e)=>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))


  }

  const onSubmit = async (e) =>{
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth,email,password)

      const user = userCredential.user
      // https://firebase.google.com/docs/auth/web/manage-users
      updateProfile(auth.currentUser, {
        displayName: name,
       })
       const formDataDuplicate = {...formData, uid: auth.currentUser.uid}
       delete formDataDuplicate.password 
       formDataDuplicate.timestamp = serverTimestamp() 

      await setDoc(doc(db, 'users', user.uid), formDataDuplicate)

      navigate('/')
    } catch (error) {
      alert('greska u registraciji')
    }

  }


  return (
    <div className='bg'>
    <div className="container">
     <div id="cloud-intro">
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
      <div className="signInContainer">
        <h2>Napravite Nalog</h2>
        <div className='underline'></div>
        <form action="" onSubmit={onSubmit}>
          <label htmlFor="">Ime i prezime</label>
          <input 
          type="text" 
          className='signIn-input'
          value={name}
          id='name'
          onChange={onChange}
          />
          <label>Unesite Vaš Email</label>
          <input className='signIn-input' 
          type="text"
          value={email}
          id='email' 
          onChange={onChange}
          />
          <label>Šifra</label>
          <input 
          type="password"
          className='signIn-input'
          value={password}
          id='password'
          onChange={onChange}
          />
          <button type='submit' >Ulogujte Se</button>
        </form>
        <p className="signIn-p">Ulogujte se uz pomoć Google naloga</p>
        <button className='signIn-google'><FcGoogle size={26}/></button>
        <Link className='linkk' to='/sign-in'>Ako već imate profil, <span>Ulogujte se</span> </Link>
      </div>
      </motion.div>
     </div>
    </div>
    </div>
  )
}

export default SignUp