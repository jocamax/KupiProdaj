import React from 'react'
import Img from '../../../components/img/profile-placeholder.png'


const User = ({user, selectUser, user1}) => {
  return (
    <div className='userContainer' onClick={() => selectUser(user)}>
        <div className='userDetails'>
            <img src={user.avatar || Img} alt="avatar" />
            <h4>{user.name}</h4>

        </div>
        {/* <div className="userStatus">{user.isOnline ? 'Onlajn' : 'Offlajn'}</div> */}
    </div>
  )
}

export default User