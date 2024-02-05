
import { Routes , Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Layout from './pages/Layout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Chat from './pages/Chat'
import ChatLayout from './pages/ChatLayout'
import PersonChat from './pages/PersonChat'

function App() {

  return ( 
      <Routes>
         <Route path='/' element={<Layout/>} >
           <Route path='/' element={<LandingPage/>} />
           <Route path='sign-in' element={<SignIn/>} />
           <Route path='sign-up' element={<SignUp/>} />
         </Route>
         <Route path='/app' element={<ChatLayout/>} >
            <Route index element={<Chat/>} />
            <Route path='chat/:id' element={<PersonChat/>} />
         </Route>
      </Routes>
  )
}

export default App
