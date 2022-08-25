import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import './signIn.css'
import { motion } from "framer-motion";

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

  const onChange = (e) =>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
      
    }))
  }

  const onSubmit = async(e)=>{
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredidentials = await signInWithEmailAndPassword(auth, email, password)

      if(userCredidentials.user){
        navigate('/')
      }
      
    } catch (error) {
      alert('Pogresilit ste email ili lozinku')
    }
  }

  const navigate = useNavigate()
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
        <h2>Ulogujte Se</h2>
        <div className='underline'></div>
        <form action="" onSubmit={onSubmit}>
          <label>Unesite Vaš Email</label>
          <input 
          className='signIn-input' 
          type="text" 
          id="email"
          value={email}
          onChange={onChange}
          required
          />
          <label>Šifra</label>
          <input 
          type="password"
          className="signIn-input"
          value={password}
          id='password'
          onChange={onChange}
          minLength='5'
          required
          />
          <button type='submit'>Ulogujte Se</button>
        </form>
        <p className="signIn-p">Ulogujte se uz pomoć Google naloga</p>
        <button className='signIn-google'><FcGoogle size={26}/></button>
        <Link className='linkk' to='/sign-up'>Ako nemate profil, <span>Registrujete se</span> </Link>
      </div>
      </motion.div>
     </div>
    </div>
    </div>
  )
}

export default SignIn