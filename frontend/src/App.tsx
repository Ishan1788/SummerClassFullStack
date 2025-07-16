import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './Features/auth/login/login';
import Register from './Features/auth/register/register';

function App(){
  return(
    <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default App
