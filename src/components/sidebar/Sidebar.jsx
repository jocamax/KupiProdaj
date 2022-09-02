import React, { useState } from 'react'
import {FaWindowClose} from 'react-icons/fa'
import './sidebar.css'
const Sidebar = ({setCategoryName}) => {
    const [sidebarActive, setSidebarActive] = useState('')
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
        <button className='hoverOpacity'>Napravi post</button>
        <div className='kategorije'>
            <h3>Kategorije</h3>
            <button className='hoverOpacity' onClick={()=> setCategoryName('')}>Sve objave</button>
            <button className='hoverOpacity' onClick={()=> setCategoryName('Tehnika')}>Tehnika</button>
            <button className='hoverOpacity' onClick={()=> setCategoryName('Ostalo')}>Ostalo</button>
        </div>
        <div className='odjavljivanje'>
            <button>Odjavi se</button>
        </div>
    </div>
    </>
  )
}

export default Sidebar