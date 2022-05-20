import { useContext } from "react"
import { TryPasswordModal } from "../TryPasswordModal"
import { ModalNewPlayer } from "../../components/ModalNewPlayer"
import { GameContext } from "../../Contexts/GameContext"
import { GameInteraction } from "../GameInteraction"
import { Canvas } from "../Canvas"
import { Container } from "./style"


export function GameBoard() {
  const { areEveryoneReady, authenticated } = useContext(GameContext)

  return (
    <Container>
      {
        authenticated ?
          areEveryoneReady || <ModalNewPlayer />:
          <TryPasswordModal />
      }
      <GameInteraction />
      <Canvas />
    </Container>
  )
}