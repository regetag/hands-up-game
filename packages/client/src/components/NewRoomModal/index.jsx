
import { Container } from "./style"

export function NewRoomModal() {

  function handleClick() {
    async function createRoom() {
      const res = await fetch("http://localhost:3000/rooms/new", { method: "POST" })
      const roomId = await res.text()

      window.location.href = `./${roomId}`
    }

    createRoom()
  }

  return (
    <Container>
      <h2>JOGAR</h2>
      <button onClick={handleClick}>Criar nova sala</button>
    </Container>
  )
}