import { Modal } from '@mantine/core'
import { useState } from 'react'
import React from 'react'
import Comments from '../Comments/Comments'
import CommentForm from '../CommentForm/CommentForm'


export const CommentsModal = ({opened, setOpened, postId}) => {  
  return (
    <div>
        <Modal 
        opened={opened}
        onClose={() => setOpened(false)}
        title="Comments"
        >
        <Comments id={postId}/>
        <CommentForm id={postId}/>
        </Modal>
    </div>
  ) 
}
