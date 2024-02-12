"use client";
import { cn } from '@/lib/utils';
import { useEffect , useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';


const Sidebar = () => {
     const pathName = useLocation().pathname;
     const [contacts , setContacts] = useState<any>([]);
     const [isLoading , setIsLoading] = useState(false);
     
     useEffect(() => {
        // get all contacts from api, and list them here
        async function getAll() {
           try {
            setIsLoading(true);
             const {data} = await axios.get("http://localhost:5000/api/v1/users/get-all");
             setContacts(data.allUsers);
             setIsLoading(false);
             
           } catch (error) {
            console.log(error)
            toast("error in getting users");
            setIsLoading(false);
           }        
        }
        getAll();
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


       {
        isLoading ? (
          <>
          <div>
            ...loading
          </div>
          </>
        ) : (
          <>
           <div className='space-y-1'>
            {
              contacts.map((contact:any) => (
                <NavLink 
                to={`/app/chat/${contact.id}`} 
                key={contact.id} 
                className={cn("text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition" , pathName === `/app/chat/${contact.id}` ? "text-white bg-white/10 " : "text-zinc-400")}
                >
                  
                  <div className='flex items-center flex-1' >
                    <img src={contact.profilePicture} alt="" className='h-5 w-5 mr-3 rounded-full' />
                    {/* <contact.profilePicture className={cn("h-5 w-5 mr-3")} /> */}
                    {contact.username}
                  </div>

                </NavLink>
              ))  
            }
        </div>
          </>
        )
       }

      </div>

    </div>
  )
}

export default Sidebar
