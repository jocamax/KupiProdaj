import React, { useState } from 'react'
import {FaWindowClose} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import './sidebar.css'
const Sidebar = ({setCategoryName}) => {
    const auth = getAuth()
    const navigate = useNavigate('')
    const [sidebarActive, setSidebarActive] = useState('')

    const onLogout = ()=>{
        auth.signOut()
        navigate('/')
      }
  return (
    <>
    <p className='sidebarShow' onClick={()=> sidebarActive ? setSidebarActive(''): setSidebarActive('sidebarActive')}>Sortiraj</p>
    <div className={`sidebar ${sidebarActive}`}>
    <p className='sidebarShowIcon' onClick={()=> sidebarActive ? setSidebarActive(''): setSidebarActive('sidebarActive')}><FaWindowClose/></p>
        <div className='pretraga'>
            <h3>Pretrazi postove</h3>
            <input type="text" placeholder='Pretraga' className='sidebar-input'/>
        </div>
        <div className='filter'>
            <h3>Filtriraj postove</h3>
            <p>Filter opcija</p>
            <p>Filter opcija</p>
            <p>Filter opcija</p>
        </div>
        <button><Link to='/create-post' className='hoverOpacity'>Napravi post</Link></button>
        <div className='kategorije'>
            <h3>Kategorije</h3>
            <button className='hoverOpacity' onClick={()=> setCategoryName('')}>Sve objave</button>
            <button className='hoverOpacity' onClick={()=> setCategoryName('Tehnika')}>Tehnika</button>
            <button className='hoverOpacity' onClick={()=> setCategoryName('Ostalo')}>Ostalo</button>
        </div>
        <div className='odjavljivanje'>
            <button onClick={onLogout}>Odjavi se</button>
        </div>
    </div>
    </>
  )
}

export default Sidebar