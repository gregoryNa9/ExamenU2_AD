import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import ListaTareas from './components/ListaTareas';


function App() {
  return (
    <Router>
      <div className="App">
        <h1>Consumo de API RESTful - Examen U2</h1>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tareas" element={<ListaTareas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
