import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Calendar from './pages/Calendar'
import NotFound from './pages/NotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element= { <Home/> }/> 
            <Route path='/login' element= { <Login/> }/> 
            <Route path='/kalender' element = {<Calendar />}/>
            <Route path='/*' element = { <NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
