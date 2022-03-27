
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Game } from "./pages/Game"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/room/:roomId" element={<Game />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
