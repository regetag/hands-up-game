import { useContext } from "react"
import { PasswordContext } from "../../Contexts/PasswordContext"

import { GameBoard } from "../../components/molecule/GameBoard"
import { GameProvider } from "../../Contexts/GameContext"

export function Game() {
  const { contextPassword } = useContext(PasswordContext)
  
  return (
    <GameProvider password={contextPassword}>
      <GameBoard />
    </GameProvider>
  )
}