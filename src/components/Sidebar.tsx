"use client";
import { cn } from '@/lib/utils';
import { Code,  CodeSquare,  Image,  ImageIcon, LayoutDashboard, MessageSquare, ScanFace, Settings, ThumbsUpIcon, Wallet, Wallet2Icon, WalletCardsIcon, WalletIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../style/ScrollStyle.css'



const contacts = [
    {
        name : "Tushar Rawat",
        icon : ScanFace,
        href : "/dashboard",
        color : "text-sky-500",
        id : "1"
    },
    {
      name : "Tushar Rawat",
      icon : ScanFace,
      href : "/dashboard",
      color : "text-sky-500",
      id : "2"
  },
 

  
]

const Sidebar = () => {
     const pathName = useLocation().pathname;
    //  const [contacts , setContacts] = useState<any[]>([]);
     
     useEffect(() => {
        // get all contacts from api, and list them here
     },[])

  return (
    <div className='space-y-4 py-4 flex flex-col h-full 
    bg-black text-white ' >
      
      <div className='px-3 py-2 flex-1 overflow-y-auto custom-scrollbar '>
       <NavLink to={"/"} className='flex items-center 
       pl-3 mb-14  ' >
          <div className='relative w-8 h-8 mr-4 '>
           
          </div>
          <h1 className={cn('text-2xl font-bold font-mono' , )}>
             ChatX
          </h1>
       </NavLink>


        <div className='space-y-1'>
            {
              contacts.map((contact) => (
                <NavLink 
                to={`/app/chat/${contact.id}`} 
                key={contact.href} 
                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition" , pathName === `/app/chat/${contact.id}` ? "text-white bg-white/10 " : "text-zinc-400")}
                >
                  
                  <div className='flex items-center flex-1' >
                    <contact.icon className={cn("h-5 w-5 mr-3")} />
                    {contact.name}
                  </div>

                </NavLink>
              ))  
            }
        </div>

      </div>

    </div>
  )
}

export default Sidebar
