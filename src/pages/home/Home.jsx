import React, { useState } from "react"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import { motion } from "framer-motion"
import "./home.css"
const Home = () => {
  const [categoryName, setCategoryName] = useState("")

  return (
    <div className='home-container'>
      <Sidebar categoryName={categoryName} setCategoryName={setCategoryName} />
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
              delay: 0.2,
            },
          },
        }}
      >
        <Posts categoryName={categoryName} setCategoryName={setCategoryName} />
      </motion.div>
    </div>
  )
}

export default Home
