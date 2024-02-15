"use client";
import { cn } from '@/lib/utils';
import { useEffect ,  useState } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sidebarSelector } from '@/store/selectors/sidebarSelector';


const Sidebar = () => {
     const pathName = useLocation().pathname;
    //  const [conversations ,setConversations] = useState<any>([]);
     const [isLoading , setIsLoading] = useState(false);
     const conversations = useRecoilValue(sidebarSelector);
     const setConversations = useSetRecoilState(sidebarSelector);


     
     useEffect(() => {
        // get all contacts from api, and list them here
        async function getAll() {
           try {
            setIsLoading(true);
             const {data} = await axios.get(`https://chatx-server-1.vercel.app/api/v1/chats/my-chats/${String(localStorage.getItem("userID"))}`);

             setConversations({
              chats : data.chats
             });
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
    <div className='h-screen space-y-4 py-4 flex flex-col 
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

       <h1 className={cn('text-2xl my-2 flex justify-center border-b-2 font-mono' , )}>
             Conversations
          </h1>


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
              conversations.chats.map((convo:any) => (
                <NavLink 
                to={`/app/chat/${convo.convoId}`} 
                key={convo.id} 
                className={cn("text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition" , pathName === `/app/chat/${convo.convoId}` ? "text-white bg-white/10 " : "text-zinc-400")}
                >
                  
                  <div className='flex items-center flex-1' >
                    <img src={convo.anotherUser.profilePicture} alt="" className='h-5 w-5 mr-3 rounded-full' />
                    {/* <contact.profilePicture className={cn("h-5 w-5 mr-3")} /> */}
                    {convo.anotherUser.username}
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
