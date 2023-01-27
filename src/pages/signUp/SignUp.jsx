import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {db} from '../../firebase.config'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import { motion } from 'framer-motion';

import './signUp.css'
import { Button, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const SignUp = () => {
  const auth = getAuth()
  const [visible, { toggle }] = useDisclosure(false)


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
    <div className="container">
      <Paper shadow='md' radius='lg' p='lg' w={500} m={10}>
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
      <Title order={2} fw='bold' c='black' mb={24} mt='14' ta='center'>
           Napravite nalog
          </Title>
        <div className='underline'></div>
        <form action="" onSubmit={onSubmit}>
        <TextInput
                  placeholder='Your name'
                  label='Ime i prezime'
                  className='signIn-input'
                  type='text'
                  id='name'
                  value={name}
                  onChange={onChange}
                  required
                />
          <TextInput
                  placeholder='Your name'
                  label='Unesite Vas Email'
                  className='signIn-input'
                  type='text'
                  id='email'
                  value={email}
                  onChange={onChange}
                  required
                />
          <PasswordInput
                  label='Unesite Vasu Lozinku'
                  className='signIn-input'
                  value={password}
                  id='password'
                  onChange={onChange}
                  minLength='5'
                  onVisibilityChange={toggle}
                  required
                />
                <Button type='submit'>Registrujte Se</Button>
        </form>

        <Link className='registerLink' to='/sign-in'>
                Ako vec imate profil,{" "}
                <Text td='underline' c='blue' mb={14}>
                  Ulogujte se
                </Text>{" "}
              </Link>
      </div>
      </motion.div>
     </div>
     </Paper>
    </div>
  )
}

export default SignUp