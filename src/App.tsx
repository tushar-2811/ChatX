
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Chat from './pages/Chat'
import LandingPage from './pages/LandingPage'

function App() {

  return (
   <BrowserRouter>
      <Routes>
      <Route path='/' element={<LandingPage/>} />
         <Route path='/sign-up' element={<SignUp/>} />
         <Route path='/sign-in' element={<SignIn/>} />
         <Route path='/chat' element={<Chat/>} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
