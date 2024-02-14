import Navbar from '@/components/Navbar'
import SideBar from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'
import FollowBar from '@/components/Followbar'

const ChatLayout = () => {
  return (
    <div
      className='h-full relative' >
       <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed 
        md:inset-y-0 z-[80] bg-gray-900 '>
        <SideBar />
      </div>

      <div className='h-full md:pl-72 '>
             <div className='grid grid-cols-4 h-full'>
                
                <div className='col-span-4
                                h-screen
                                mx-4
                                lg:col-span-3
                                block
                              ' >
                <Navbar/>
                 <Outlet/>
                </div>
                <FollowBar/>
            </div> 
        </div>

    </div>
  )
}

export default ChatLayout
