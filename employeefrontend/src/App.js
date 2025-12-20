
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./pages/header/Header.js";
import Dashboard from './pages/dashboard/Dashboard.js';
import NoMatch from './pages/nomatch/NoMatch.js';
import PostUser from './pages/employee/PostUser.js';
import UserUpdate from './pages/employee/UserUpdate.js';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/employee' element={<PostUser/>} />
        <Route path='*' element={<NoMatch/>} />
        <Route path='/employee/:id' element={<UserUpdate/>} />
      </Routes>
    </>
  );
}

export default App;
