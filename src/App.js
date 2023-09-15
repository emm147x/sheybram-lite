
import './App.css';
import { BrowserRouter, Route, Routes, Redirect, Navigate  } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPost from './pages/AddPost';
import Post from './components/Post';


function App() {
  return (
    <div className="App">
       <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<protectedRouted><Home /></protectedRouted>} />
        <Route path="/addpost" element={<protectedRouted><AddPost /></protectedRouted>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />


        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

function protectedRouted({children}) {
  if(localStorage.getItem('sheygram-lite-user'))
  {
    return children
  }else {
    return <Navigate to='/login'/>
  }
}

export default App;
