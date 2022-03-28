import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PasswordProvider } from "./Contexts/PasswordContext"
import { Home } from "./pages/Home"
import { Game } from "./pages/Game"

function App() {
  return (
    <Router>
      <PasswordProvider>
        <Routes>
          <Route exact path="/room/:roomId" element={<Game />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </PasswordProvider>
    </Router>
  )
}

export default App
