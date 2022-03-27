import { useState } from "react"
import { Container } from "./style"

export function NewRoomModal({setRoomListVisible}) {
  const [ roomName, setRoomName ] = useState("")
  const [ maxPlayer, setMaxPlayer ] = useState(5)

  async function handleClick() {
    console.log(roomName)
    console.log(maxPlayer)

    const res = await fetch("http://localhost:3000/rooms/new",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        maxUsers:maxPlayer, 
        roomName
      })
    })

    const roomId = await res.text()
    
    window.location.href = `./room/${roomId}`
  }

  return (
    <Container>
      <h2>Criar nova sala</h2>
      <section className="NewRoomModal--input-section">
        <div>
          <p>Nome da sala:</p>
          
          <input 
            type="text" 
            placeholder="Nome da sala" 
            onChange={e => setRoomName(e.target.value)}
          />
        </div>
        <div>
          <p>maximo de jogadores:</p>

          <input 
            type="number"
            placeholder="Maximo de jogadores"
            onChange={e => setMaxPlayer(e.target.value)}
          />
        </div>
      </section>
      <section>
        <button onClick={() => setRoomListVisible(true)}>Voltar</button>
        <button onClick={handleClick}>Criar nova sala</button>
      </section>
    </Container>
  )
}