import {useEffect, useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Loading from './loading/Loading'
import { Loader } from '@mantine/core'


// https://stackoverflow.com/questions/65505665/protected-route-with-firebase
// protected routes https://www.youtube.com/watch?v=0x8Dap2EIVE
export const useAuthStatus = () =>{
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  
  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setLoggedIn(true)
      }
      setCheckingStatus(false)
    })
  })
  return {loggedIn, checkingStatus}
}

function ProtectedRoute() {

  const {loggedIn, checkingStatus} = useAuthStatus()
  if(checkingStatus){
    return <Loading/>
  }

  return loggedIn ? <Outlet/> : <Navigate to='/sign-in'/> 
}

export default ProtectedRoute