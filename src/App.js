import React from 'react';
import Home from './HomePage/home';
import Profile from './ProfilePage/profile';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </Router>
    </div>   
  );
}


export default App;