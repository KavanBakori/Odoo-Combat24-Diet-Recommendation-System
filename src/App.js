import React from 'react';
import './App.css'
import Home from './HomePage/home';
import Profile from './ProfilePage/profile';
import Popupform from './popupform/popupform';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/popupform' element={<Popupform/>} />
        </Routes>
      </Router>
    </div>   
  );
}


export default App;