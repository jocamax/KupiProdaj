import React from 'react'
import './singleComment.css'

const SingleComment = ({comment, id}) => {
  return (
    <div className='singleComment'>
      <div className='commentedBy'>Autor komentara <span className='commentSpan'>{comment.displayName}</span></div>
      <div className='commentText'>{comment.commentText}</div>
    </div>
  )
}
 
export default SingleComment