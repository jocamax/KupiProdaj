import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import SignIn from './pages/signIn/SignIn';
import CreatePost from './pages/createPost/CreatePost';
import Profile from './pages/profil/Profile';
import SignUp from './pages/signUp/SignUp';
import ProtectedRoute from './components/PrivateRoute';
import Messenger from './pages/messenger/Messenger';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/sign-in' element={<SignIn/>}></Route>
      <Route path='/profil' element={<ProtectedRoute/>}>
        <Route path='/profil' element={<Profile/>}></Route>
      </Route>
      <Route path='/create-post' element={<ProtectedRoute/>}>
      <Route path='/create-post' element={<CreatePost/>}></Route>
      </Route>

      <Route path='/' element={<ProtectedRoute/>}>
      <Route path='/' element={<Home/>}></Route>
      </Route>

      <Route path='/messenger' element={<ProtectedRoute/>}>
      <Route path='/messenger' element={<Messenger/>}></Route>
      </Route>

      <Route path='/sign-up' element={<SignUp/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
