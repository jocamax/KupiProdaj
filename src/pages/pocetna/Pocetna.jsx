import React from "react"
import "./pocetna.css"
import { Link } from "react-router-dom"

const Pocetna = () => {
  return (
    <div className='pocetna'>
      <h1>Lorem ipsum dolor sit</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
        ut. Lorem dolor asci domoro pomo
      </p>
      <div>
        <Link to='/sign-in'>
          {" "}
          <button className='btn'>Ulogujte se</button>
        </Link>
        ili se
        <Link to='/sign-up'>
          {" "}
          <button className='btn'>Registrujte</button>
        </Link>
      </div>
    </div>
  )
}

export default Pocetna
