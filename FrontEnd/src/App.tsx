import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './routes/HomePage'

function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<HomePage />}></Route>
  <Route path="/list-tasks" element={<HomePage />}></Route>
</Routes>
</BrowserRouter>
  )
}

export default App
