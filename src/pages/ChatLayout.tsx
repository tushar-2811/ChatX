import Navbar from '@/components/Navbar'
import SideBar from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'

const ChatLayout = () => {
  return (
    <div
      className='h-full relative' >
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed 
        md:inset-y-0 z-[80] bg-gray-900 '>
        <SideBar />
      </div>

      <main className='md:pl-72'>
        <Navbar />
        <Outlet/>
      </main>

    </div>
  )
}

export default ChatLayout
