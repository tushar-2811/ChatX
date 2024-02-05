import LandingHero from '@/components/LandingHero'
import {NavLink} from 'react-router-dom'
import { Button } from '@/components/ui/button'

const LandingPage = () => {
  return (
    <div>
       <LandingHero/>
       <div className='flex justify-center items-center' >
         <NavLink to={"/sign-up"} >
            <Button className='bg-white text-2xl border-2 text-black border-black py-4 px-12 font-mono hover:bg-black hover:text-white' >
              Let's Connect
            </Button>
         </NavLink>
       </div>
    </div>
  )
}

export default LandingPage
