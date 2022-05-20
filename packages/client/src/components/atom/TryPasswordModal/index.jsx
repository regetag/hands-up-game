import { useState, useContext } from "react"
import { GameContext } from "../../../Contexts/GameContext"
import { io } from "socket.io-client"

export function TryPasswordModal(){
  const { room, setAuthenticated, setSocket } = useContext(GameContext)

  const [ password, setPassword ] = useState("")

  async function handleSubmitPassword(){
    const resposnse = await fetch(`http://localhost:3000/rooms/${room}/auth`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({password})
    })

    if(resposnse.status === 200) {
      const connection = io("localhost:3000/", {
        auth:{
          roomId: room,
          password
        }
      })

      setSocket(connection)
      return setAuthenticated(true)
    }
  }

  return(
    <div>
      <input type="text" onChange={e => setPassword(e.target.value)}/>
      <button onClick={handleSubmitPassword}>
        Submit
      </button>
    </div>
  )
}