import React from 'react'
import '../messenger.css'

const MessageForm = ({handleSubmit, text, setText}) => {
  return (
    <div className='formDiv'>
    <form action="" onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder='Enter message' 
        value={text} 
        className='messageForm'
        onChange={(e) => setText(e.target.value)}
        required />
        <button className='messageBtn'>Pošalji</button>
    </form>
    </div>

  )
}

export default MessageForm