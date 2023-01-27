import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from "react-router-dom"
import "./signIn.css"
import { motion } from "framer-motion"
import { Button, Paper, PasswordInput, TextInput, Text, Title, Mark } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import {AiOutlineClose} from 'react-icons/ai'
const SignIn = () => {
  const [visible, { toggle }] = useDisclosure(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredidentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (userCredidentials.user) {
        navigate("/")
        showNotification({
          onClose: () => console.log('unmounted'),
          onOpen: () => console.log('mounted'),
          autoClose: 4000,
          title: "Uspešno ste se ulogovali",
          loading: false,
        });
      }
    } catch (error) {
      showNotification({
        onClose: () => console.log('unmounted'),
        onOpen: () => console.log('mounted'),
        autoClose: 4000,
        title: "Pogresili ste email ili lozinku",
        color: 'red',
        loading: false,
      });
    }
  }

  const navigate = useNavigate()
  return (
    <div className='container'>
      <Paper shadow='md' radius='lg' p='lg' w={500} m={10}>
        <div id='cloud-intro'>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={{
              hidden: {
                scale: 0.95,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.1,
                },
              },
            }}
          >
            <div className='signInContainer'>
              <Title order={2} fw='bold' c='black' mb={24} mt='14' ta='center'>
                Ulogujte Se
              </Title>
              <div className='underline'></div>
              <form action='' onSubmit={onSubmit}>
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
                <Button type='submit'>Ulogujte Se</Button>
              </form>
              <div className='gLogin'>
                <Text>Ulogujte se uz pomoć Google naloga</Text>
                <button className='signIn-google'>
                  <FcGoogle size={26} />
                </button>
              </div>

              <Link className='registerLink' to='/sign-up'>
                Ako nemate profil,{" "}
                <Text td='underline' c='blue' mb={14}>
                  Registrujete se
                </Text>{" "}
              </Link>
            </div>
          </motion.div>
        </div>
        <Text>Demo nalog:  EMAIL: <Mark color="blue"> demo@kupiprodaj.com</Mark></Text>
        <Text> LOZINKA:<Mark color="blue"> 123123 </Mark></Text>
      </Paper>
    </div>
  )
}

export default SignIn
