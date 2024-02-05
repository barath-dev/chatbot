import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Chat from "./pages/Chat"
import Landing from "./pages/Landing"
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
    </BrowserRouter>
  )
}
