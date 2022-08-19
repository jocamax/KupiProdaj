import React from 'react'

const Message = ({msg, user1}) => {
  return (
    
    <div className={`singleMessageContainer ${msg.from === user1 ? 'my' : ''}`}>
        <p>{msg.text}</p>
    </div>

  )
}

export default Message