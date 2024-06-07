import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Arena from './pages/Arena';
import { PlayerProvider } from './PlayerContext';
function App() {


  return (
    <>
    <PlayerProvider>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/arena' element={<Arena />}/>
      </Routes>
    </PlayerProvider>  
    </>
  )
}

export default App
