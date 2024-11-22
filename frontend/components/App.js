import { useState, useEffect } from 'react'
import React from 'react'
import Home from './Home'
import Form from './Form'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div id="app">
      <nav>
    <Link to="/">Home</Link>&nbsp;
    <Link to="Form />">Form</Link>&nbsp;


        {/* NavLinks here */}
      </nav>
      {/* Route and Routes here */}
      
      <Routes>
        <Route path= "/" element={<Home />} />
        <Route path= "Form" element={<Form />} />

      </Routes>
      <App />
      <Form />
    </div>
  )
}

export default App
