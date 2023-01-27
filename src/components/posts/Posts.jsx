import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore"
import { db } from "../../firebase.config"
import Post from "../post/Post"
import "./posts.css"
import Loading from "../loading/Loading"

const Posts = ({ categoryName, setSidebarActive }) => {
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedPost, setLastFetchedPost] = useState(null)

  useEffect(() => {
    if (categoryName !== "") {
      const fetchPosts = async () => {
        try {
          const oglasiRef = collection(db, "posts")
          // pravim query
          const q = query(
            oglasiRef,
            where("category", "==", categoryName),
            orderBy("timestamp", "desc"),
            limit(14)
          )
          // execute query
          const querySnap = await getDocs(q)
          const lastVisibleDoc = querySnap.docs[querySnap.docs.length - 1]
          setLastFetchedPost(lastVisibleDoc)
          const posts = []

          querySnap.forEach((doc) => {
            return posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })

          setPosts(posts)
          setLoading(false)
        } catch (error) {
          alert("ERRR")
        }
      }
      fetchPosts()
    } else {
      const fetchPosts = async () => {
        try {
          const oglasiRef = collection(db, "posts")
          // pravim query
          const q = query(oglasiRef, orderBy("timestamp", "desc"), limit(14))
          // execute query
          const querySnap = await getDocs(q)
          const lastVisibleDoc = querySnap.docs[querySnap.docs.length - 1]
          setLastFetchedPost(lastVisibleDoc)
          const posts = []

          querySnap.forEach((doc) => {
            return posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })

          setPosts(posts)
          setLoading(false)
        } catch (error) {
          alert("ERRR")
        }
      }
      fetchPosts()
    }
  }, [categoryName])

  //fetch post based on categoryName if categoryName is not empty

  // LOAD MORE PAGINATION
  const fetchMorePosts = async () => {
    try {
      const oglasiRef = collection(db, "posts")
      // pravim query
      const q = query(
        oglasiRef,
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedPost),
        limit(16)
      )
      // execute query
      const querySnap = await getDocs(q)
      const lastVisibleDoc = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedPost(lastVisibleDoc)
      const posts = []

      querySnap.forEach((doc) => {
        return posts.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setPosts((prevState) => [...prevState, ...posts])
      setLoading(false)
    } catch (error) {
      alert("ERRR")
    }
  }

  return (
    <div className="postsContainer">
      {loading ? (
        <Loading />
      ) : posts && posts.length > 0 ? (
        <>
          <main>
            <ul className='posts-grid'>
              {posts?.map((post) => {
                return <Post post={post.data} id={post.id} key={post.id} />
              })}
            </ul>
            {lastFetchedPost && (
              <p className='loadMoreBtn' onClick={fetchMorePosts}>
                Učitaj Još Postova
              </p>
            )}
          </main>
        </>
      ) : (
        <p>Nema postova</p>
      )}
    </div>
  )
}

export default Posts
