import { useContext } from "react"
import { TryPasswordModal } from "../../atom/TryPasswordModal"
import { ModalNewPlayer } from "../../atom/ModalNewPlayer"
import { GameContext } from "../../../Contexts/GameContext"
import { GameInteraction } from "../../atom/GameInteraction"
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