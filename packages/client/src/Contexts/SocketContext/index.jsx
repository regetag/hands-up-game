import { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

export const SocketContext = createContext()

export function SocketProvider({children}){
  const [socket, setSocket] = useState({})
  const [roomList, setRoomList] = useState([])


  useEffect(() => {
    const connection = io("localhost:3000/roomList")

    connection.on("connect", () => setSocket(connection))
    connection.on("room-list", list => setRoomList(list))
  }, [])

  const values = {
    socket,
    setSocket,
    roomList,
    setRoomList
  }

  return(
    <SocketContext.Provider value={values}>
      {children}
    </SocketContext.Provider>
  )
}