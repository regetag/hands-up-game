import { useState, useEffect } from "react"
import { Container } from "./style"

export function RoomLi({data}){
  const {id, name, maxPlayers, currentPlayersAmount} = data
  const [ isFullRoom, setIsFullRoom ] = useState(false)

  useEffect( () => {
    if(currentPlayersAmount >= maxPlayers) setIsFullRoom(true)
  }, [])

  function handleClick(){
    window.location.href = "/room/" + id
  }

  return(
    <Container>
      <div>
        <p>{name}</p>
        <small>
          {currentPlayersAmount}/{maxPlayers}
        </small>
      </div>

      {
        isFullRoom ? (
          <button
            disabled={true}
          >
            sala cheia
          </button>
        ) : (
          <button onClick={handleClick}>
            Entrar
          </button>
        )
      }

    </Container>
  )
}