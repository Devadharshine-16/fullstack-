import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './home.jsx'
import Greeting from './greeting.jsx'
import Counter from './counter.jsx'
import Slide from './slide.jsx'
function App() {

  return (
    <div className="App">
      <h1>Hello Vite + React!</h1>
      <Home />
      <Greeting name="DEV"/>
      <Counter />
      <Slide /> 
    </div>
  )
}

export default App;