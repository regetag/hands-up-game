import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../../../Contexts/SocketContext"
import { Container } from "./styles"
import { RoomLi } from "../../atom/RoomLi"
import { PoliceButton } from "../../atom/PoliceButton"

export function RoomList({setRoomListVisible}){
  const { roomList } = useContext(SocketContext)
  const [ roomData, setRoomData ] = useState([])

  useEffect( () => {
    const rooms = []

    Object.entries(roomList).forEach( ([key, value]) => {
      const currentRoom = {
        id: key,
        name: value.name,
        maxPlayers: value.maxUsers,
        currentPlayersAmount: value.users.length,
        password: value.password,
      }

      rooms.push(currentRoom)
    })

    setRoomData(rooms)
  }, [roomList])

  return(
    <Container>
      <div>
        
        <ul>
          {
            roomData.length > 0 && roomData.map( (data, i) => <RoomLi key={i} data={data} />) 
          }
        </ul>

        <PoliceButton onClick={() => setRoomListVisible(false)}>
          Criar Sala
        </PoliceButton>

      </div>
    </Container>
  )
}