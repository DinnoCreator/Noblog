import { SignUp } from './pages/unauthenticated/Signup';
import { Routes, Route } from 'react-router-dom';
import ViewAllPosts from './pages/authenticated/ViewAllpost';
import View from './pages/authenticated/View';
import VistorViewPost from './pages/unauthenticated/VistorViewPost';
import Login from './pages/unauthenticated/Login';
import CreatePost from './pages/authenticated/CreatePost';

function App() {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp />}/>
       <Route path='/login' element={<Login />}/>
      <Route path='/' element={<ViewAllPosts/>}/>
      <Route path='/posts/view' element={<View/>}/>
      <Route path='/posts/view/visitor' element={<VistorViewPost/>}/>
      <Route path='/createpost' element={<CreatePost/>}/>
    </Routes>
  );
}

export default App;

