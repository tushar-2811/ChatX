import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import {RecoilRoot} from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
 
    <BrowserRouter>
    <RecoilRoot>
      <Toaster/>
       <App />
    </RecoilRoot>
    </BrowserRouter>

)
