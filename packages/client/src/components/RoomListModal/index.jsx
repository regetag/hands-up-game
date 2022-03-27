import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../../Contexts/SocketContext"
import { Container } from "./styles"
import { RoomLi } from "../RoomLi"

export function RoomList({setRoomListVisible}){
  const { roomList } = useContext(SocketContext)
  const [ roomData, setRoomData ] = useState([])

  useEffect( () => {
    const rooms = []

    Object.entries(roomList).forEach( ([key, value]) => {
      const currentRoom = {}

      currentRoom.id = key
      currentRoom.name = value.name
      currentRoom.maxPlayers = value.maxUsers
      currentRoom.currentPlayersAmount = value.users.length

      rooms.push(currentRoom)
    })

    setRoomData(rooms)
  }, [roomList])

  return(
    <Container>
      <ul>
        {
          roomData.length > 0 && roomData.map( (data, i) => <RoomLi key={i} data={data} />) 
        }
      </ul>
      <button onClick={() => setRoomListVisible(false)}>
        Criar Sala
      </button>
    </Container>
  )
}