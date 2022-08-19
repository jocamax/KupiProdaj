import { useEffect, useState, useRef } from "react"
import { db } from "../../firebase.config"
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, limitToLast } from "firebase/firestore"
import {getAuth} from 'firebase/auth'
import User from "./components/User"
import MessageForm from "./components/MessageForm"
import Message from "./components/Message"
import './messenger.css'



const Messenger = ({user, post}) => {
    const auth = getAuth()
    
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState('')
    const [text, setText] = useState('')
    const [msgs, setMsgs] = useState('')
    //https://www.youtube.com/watch?v=27jInSXXbqk&ab_channel=PracticalDeveloper messageref
    const messagesEndRef = useRef(null)
    const user1 = auth.currentUser.uid
    useEffect (()=>{
        const usersRef = collection(db, 'users')
        //query object
        const q = query(usersRef, where('uid', 'not-in', [user1]))
        //execute q
        const unsub = onSnapshot(q, querySnapshot => {
            let users = []
            querySnapshot.forEach((doc)=>{
                users.push(doc.data())
            })
            setUsers(users)
        })
        return () => unsub()
        
    }, [])

    const selectUser = (user) => {
        setChat(user)
        const user2 = user.uid;
        
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    
        const msgsRef = collection(db, "messages", id, "chat");
        const q = query(msgsRef, orderBy("createdAt", "asc"),limitToLast(26));

        onSnapshot(q, querySnapshot => {
            let msgs = []
            querySnapshot.forEach(doc=>{
                msgs.push(doc.data())
            })
            setMsgs(msgs)
        })
    }

    useEffect (()=>{
        messagesEndRef.current?.scrollIntoView()
    }, [msgs])

    const handleSubmit = async (e) => { 
        e.preventDefault()
        const user2 = chat.uid
        console.log(chat.uid);
        const id = user1 > user2 ? `${user1 + user2}`: `${user2 + user1}`
        // messages => id => chat => addDoc
        await addDoc(collection(db, "messages", id, "chat"), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
          });
        setText('')
    }

  return (
    <div className="messengerContainer">
        <div className="usersContainer">
            {users.map(user => <User key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat}/>)}
        </div>
        <div className="messageContainer">
            
            {chat ? <div className="chatUsername">
                <h3>Dopisujete se sa: <span className="blue">{chat.name}</span></h3>
            </div>: <h3 className="">Select user</h3>}
            <div className="messangingSection">
            <div className="messages">
                {msgs.length ? msgs.map((msg, i)=> (
                <Message key={i} msg={msg} user1={user1}/>
                )) : null}
                <div ref={messagesEndRef} />
            </div>
            </div> 
            <MessageForm 
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}/>
        </div>
    </div>
  )
}

export default Messenger