import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import SignIn from './pages/sign/Sign';
import Navbar from './compoents/navbar/nav';
import Main from "./compoents/main/main.jsx"

function App() {
  
  return (

    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<SignIn/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
