import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Arena from './pages/Arena';
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/arena' element={<Arena />}/>
      </Routes>
      
    </>
  )
}

export default App
