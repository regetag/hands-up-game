import { useState } from "react"
import { SocketProvider } from "../../Contexts/SocketContext"
// import { CarAnimation } from "../../components/CarAnimation"
import { NewRoomModal } from "../../components/NewRoomModal"
import { RoomList } from "../../components/RoomListModal"
import { Container } from "./style"


export function Home() {
  const [ roomListVisible, setRoomListVisible ] = useState(true)

  return (
    <Container>
      <SocketProvider>

        {
          roomListVisible ?
            <RoomList setRoomListVisible={setRoomListVisible} /> :
            <NewRoomModal setRoomListVisible={setRoomListVisible} />
        }
      
        {/* <CarAnimation /> */}
      </SocketProvider>
    </Container>
  )
}