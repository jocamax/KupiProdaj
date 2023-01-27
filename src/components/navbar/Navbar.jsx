import { useState } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import { Button, Heading } from "@mantine/core"
import { VscThreeBars } from "react-icons/vsc"
import { AiFillCloseSquare } from "react-icons/ai"
import {FcShop} from 'react-icons/fc'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { title: "Početna", path: "/" },
    { title: "Napravi Post", path: "/create-post" },
    { title: "Uloguj Se", path: "/sign-in" },
    { title: "Moj Profil", path: "/profil" },
  ]

  return (
    <nav className='navbar-container'>

        <div className='brand'>
          <Link to='/' className="logo">
            {/* <img src={Logo} width={220} height={50} alt='Logo' /> */}
            <FcShop className='logoPicture'/>
            <h1>KupiProdaj</h1>
          </Link>
        </div>

        <div className={`navElements ${isOpen ? "" : "hide"}`}>
          <ul className='navItems'>
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className='nav-item'>
                  
                  <Link to={item.path}>{item.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>

          <div className='toggleNav'>
            <div className='openCloseBtn' onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <AiFillCloseSquare /> : <VscThreeBars />}
            </div>
          </div>
        
    </nav>
  )
}

export default Navbar
