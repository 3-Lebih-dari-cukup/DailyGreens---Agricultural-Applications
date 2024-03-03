import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddVeggies from './pages/AddVeggies';
import { VeggiesList } from './pages/VeggiesList';
import { UpdateVeggies } from './pages/UpdateVeggies';


function App() {
  return (
    <Routes>
      <Route 
      path='/' 
      element={<VeggiesList />} />
      <Route 
      path='/addVeggies' 
      element={<AddVeggies />} />
      <Route 
      path='/updateVeggies/:id' 
      element={<UpdateVeggies />} />
    </Routes>
  );
}

export default App;
