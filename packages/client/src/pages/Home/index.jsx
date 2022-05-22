import { useState, useEffect, useContext } from "react"
import { SocketProvider } from "../../Contexts/SocketContext"
import { CarAnimation } from "../../components/atom/CarAnimation"
import { PasswordContext } from "../../Contexts/PasswordContext"
import { NewRoomModal } from "../../components/molecule/NewRoomModal"
import { RoomList } from "../../components/molecule/RoomListModal"
import { Container } from "./style"


export function Home() {
  const [ roomListVisible, setRoomListVisible ] = useState(true)
  const { setContextPassword } = useContext(PasswordContext)

  useEffect( () => {
    setContextPassword("")
  }, []) 

  return (
    <Container>
      <SocketProvider>

        {
          roomListVisible ?
            <RoomList setRoomListVisible={setRoomListVisible} /> :
            <NewRoomModal setRoomListVisible={setRoomListVisible} />
        }
      
      </SocketProvider>
      <CarAnimation />
    </Container>
  )
}