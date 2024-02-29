'use client'
import axios from "axios";
import qs from "query-string";
import { useEffect, useState } from "react";
import { io as ClientIO} from "socket.io-client";

export default function Page(): JSX.Element {
  const [socket, setSocket] = useState<any>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [inbox, setInbox] = useState<any>([])
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");

  // useEffect(()=>{
  //   const socket = io('http://localhost:8000')
  //   console.log("effect called", socket)

  //   socket.on('message', (message, room)=>{
  //     console.log("recieved mesage", message)
  //     setInbox((inbox:any)=> [...inbox, message])
  //   })

  //   setSocket(socket)

  //   return () => {socket.close()}
  // },[])

  const onMessage = async (values: any) => {
    try {
      console.log("mesasge sent ")
      await axios.post('/api/socket/messages/hi', {
        message: values
      });

    } catch (error) {
      console.log(error);
    }
  }

  const onRoomJoin = async (values: any) => {
    try {
      console.log("mesasge sent ")
      await axios.post('/api/socket/messages/hi', {
        message: values
      });

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    if(socket){

      socket.on("message", (message:string) => {
        console.log("New message", message)
        setInbox((inbox:any)=> [...inbox, message])
      })
    }
  },[socket])

  useEffect(()=>{
    console.log("effect called", process.env.NEXT_PUBLIC_SITE_URL)
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    setSocket(socketInstance)

    socketInstance.on("connect", () => {
      console.log("user connected on new socket")
      setIsConnected(true);
    })

  },[])

  const handleRoomName = () => {
    if(socket){
      socket.emit("joinRoom", roomName)
    }
  }

  return (
    <div>
      {inbox.map((message:any, idx:any)=>{
        return(
          <p key={idx}>
            {message}
          </p>
        )
      })}

      <input 
        style={{backgroundColor:'gray'}}
        type="text"
        name="message"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={() => {onMessage(message)}}>
        Message
      </button>
      

      roomname
      <input 
        style={{backgroundColor:'gray'}}
        type="text"
        name="room" 
        onChange={(e) => setRoomName(e.target.value)}
      />

      <button onClick={() => {handleRoomName()}}>
        jOIN ROOM
      </button>
    </div>
  );
}
