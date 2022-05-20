import { useState, useContext } from "react"
import { PasswordContext } from "../../Contexts/PasswordContext"
import { Container } from "./style"
import { useNavigate } from "react-router-dom"

export function NewRoomModal({setRoomListVisible}) {
  const navigate = useNavigate()

  const { setContextPassword } = useContext(PasswordContext)

  const [ roomName, setRoomName ] = useState("")
  const [ maxPlayer, setMaxPlayer ] = useState(5)
  const [ passwordCheckBox, setPasswordCheckBox ] = useState(false)
  const [ password, setPassword ] = useState("")

  async function handleClick() {
    const body = {
      maxUsers:maxPlayer, 
      roomName,
    }
    
    if(passwordCheckBox){
      setContextPassword(password)
      body.password = password
    }

    const res = await fetch("http://localhost:3000/rooms/new",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body)
    })

    const roomId = await res.text()
  
    navigate(`/room/${roomId}`)
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
          <p>Maximo de jogadores:</p>

          <input 
            type="number"
            placeholder="Maximo de jogadores"
            onChange={e => setMaxPlayer(e.target.value)}
          />
        </div>
        <div>
          <p>Senha:</p>
          <input onChange={() => setPasswordCheckBox( passwordCheckBox ? false: true )} type="checkbox"/>

          {
            passwordCheckBox ? 
              <input 
                type="text"
                placeholder="senha"
                onChange={e => setPassword(e.target.value)}
              /> :
              <input 
                disabled
                type="text"
                placeholder="senha"
                onChange={e => setPassword(e.target.value)}
              />
          }
        </div>
      </section>
      <section>
        <button onClick={() => setRoomListVisible(true)}>Voltar</button>
        <button onClick={handleClick}>Criar nova sala</button>
      </section>
    </Container>
  )
}