import Loading from '../loading/Loading'
import SingleComment from '../SingleComment/SingleComment'
import {useEffect, useState} from 'react'
import {
  collection, 
  getDocs, 
  query, 
  orderBy,
  limit,
  startAfter
  }    from 'firebase/firestore'
  import {db} from '../../firebase.config'
  import './comments.css'


const Comments = ({id, commentLength}) => {
  const [comments, setComments] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedComment, setLastFetchedComment] = useState(null) 


  useEffect(()=>{
    const fetchComments = async ()=>{
      try {
        const oglasiRef = collection(db,'comments')
        // pravim query
        const q = query(
          oglasiRef,
          orderBy('timestamp', 'desc'), 
          limit(10)
          )
          // execute query
          const querySnap = await getDocs(q)
          const lastVisibleDoc = querySnap.docs[querySnap.docs.length - 1]
          setLastFetchedComment(lastVisibleDoc)
          const comments = []

          querySnap.forEach((doc)=>{
            return comments.push({
              id: doc.id,
              data: doc.data()
            })
          })
          

          setComments(comments)
          setLoading(false)
      } catch (error) {
        alert('ERRR')
      }

    }
    fetchComments()
  },[])

  const fetchMoreComments = async ()=>{
    try {
      const oglasiRef = collection(db,'comments')
      // pravim query
      const q = query(
        oglasiRef,
        orderBy('timestamp', 'desc'), 
        startAfter(lastFetchedComment),
        limit(10)
        )
        // execute query
        const querySnap = await getDocs(q)
        const lastVisibleDoc = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedComment(lastVisibleDoc)
        const comments = []

        querySnap.forEach((doc)=>{
          return comments.push({
            id: doc.id,
            data: doc.data()
          })
        })
        

        setComments((prevState) => [...prevState, ...comments])
        setLoading(false)
    } catch (error) {
      alert('ERRR')
    }

  }

  return (
    <div>{loading?( <Loading/> ): comments && comments.length > 0 ? (
      <>
      <section> 
        <ul className='commentFlex'>
          {comments?.map((comment) =>{
           if(comment.data.postId === id){
           return <SingleComment 
           comment={comment.data} 
           id={comment.id} 
           key={comment.id}
           
           />
           }
          })}
          
        </ul>
       
      </section>
      {lastFetchedComment && (
          <p className="loadMoreComments" onClick={fetchMoreComments}>Učitaj Još Komentara</p>
        )}
      </> 
       ):( <p>Nema komentara</p>
      
    )}
    </div>
  )
}

export default Comments