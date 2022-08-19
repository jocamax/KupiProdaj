import React, { useState } from 'react'
import './sidebar.css'
const Sidebar = ({setCategoryName}) => {
    const [sidebarActive, setSidebarActive] = useState('')
  return (
    <>
    <p className='sidebarShow' onClick={()=> sidebarActive ? setSidebarActive(''): setSidebarActive('sidebarActive')}>Sortiraj</p>
    <div className={`sidebar ${sidebarActive}`}>
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
        <button>Napravi post</button>
        <div className='kategorije'>
            <h3>Kategorije</h3>
            <button onClick={()=> setCategoryName('')}>Sve objave</button>
            <button onClick={()=> setCategoryName('Tehnika')}>Tehnika</button>
            <button onClick={()=> setCategoryName('Ostalo')}>Ostalo</button>
        </div>
        <div className='odjavljivanje'>
            <button>Odjavi se</button>
        </div>
    </div>
    </>
  )
}

export default Sidebar