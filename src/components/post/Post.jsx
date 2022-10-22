import React, { useState } from "react"
import "./post.css"
import { FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa"
import CommentForm from "../CommentForm/CommentForm"
import Comments from "../Comments/Comments"
import { Link } from "react-router-dom"

const Post = ({ post, id, setChat, onDelete }) => {
  const [active, setActive] = useState("active")
  return (
    <div className='oglasContainerLi'>
      <div className='oglasContainer'>
        <div className='oglasImgContainer'>
          <img className='oglasImg' src={post.imgUrls[0]} alt='Post slika' />
        </div>

        <div className='oglasMainContent'>
          <div className='mainContentFlex1'>
            <div className='nameAndPhone'>
              <p className='oglasName aTagRemove'>{post.ime}</p>
              <p className='brTelefona'>{post.category}</p>
            </div>

            <p className='oglasLocation'>
              <FaMapMarkerAlt /> {post.grad}
            </p>
          </div>
          <div className='mainContentFlex2'>
            <p>{post.text}</p>
            <p></p>
          </div>
          <div className='oglasiBtn'>
            <Link to='/messenger' className='btn btn-link'>
              Posalji poruku
            </Link>
            <button
              className='btn'
              onClick={(e) =>
                active === "" ? setActive("active") : setActive("")
              }
            >
              Komentari{" "}
            </button>
            {onDelete && (
              <div className='deletePostBtn'>
                <p>Obrišite post: </p>
                <FaTrashAlt
                  className='deletePost'
                  fill='red'
                  cursor='pointer'
                  onClick={() => onDelete(post.id, post.name)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`comments ${active}`}>
        <div>
          <CommentForm id={id} />
        </div>
        <div>
          <Comments id={id} />
        </div>
      </div>
    </div>
  )
}

export default Post
