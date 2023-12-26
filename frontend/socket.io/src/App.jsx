import { useState } from 'react'
import React from 'react'
import './App.css'
import io from "socket.io-client"
import { useEffect } from 'react'
const socket = io.connect("http://localhost:3000")

function App() {
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [recievedMessage, setRecievedMessage] = useState([])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // setRecievedMessage(prevRecievedMessage => [...prevRecievedMessage, data.message])
      setRecievedMessage(data.message)
      console.log(data)
    })
  }, [socket])


  const joinRoom = () => {
    if(room !== '') {
      socket.emit("join_room", room)
    }
  }
  
  const sendMessage = () => {
    socket.emit("send_message", { message: message, room: room })
  }

  return (
    <>
      <input placeholder='Room' onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
      <br/>
      <input placeholder='Message' onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message: <br />{recievedMessage}</h1>
    </>
  )
}

export default App
