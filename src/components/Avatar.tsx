import axios from "axios";
import profile from "../assets/placeholder.png"


import {  useRecoilState } from 'recoil';
import { sidebarSelector } from '@/store/selectors/sidebarSelector';
import { useNavigate } from "react-router-dom";

interface AvatarProps {
    userId : string;
    isLarge ?: boolean;
    hasBorder ?: boolean;
    profileImage ?: string;
    name : string
}

const Avatar:React.FC<AvatarProps> = ({userId , isLarge ,hasBorder , profileImage , name}) => {
  const [conversations, setConversations] = useRecoilState(sidebarSelector);
  const Navigate = useNavigate();

  const hanldeClick = async() => {
   
       try {
          const response = await axios.get(`https://chatx-server-1.vercel.app/api/v1/chats/get-chats/${String(localStorage.getItem("userID"))}/${String(userId)}`);

          if(response.data.ok && response.data.newChatcreated){
            setConversations((oldConversations: any) => {
              return {
                ...oldConversations,
                chats: [...oldConversations.chats, response.data.chats],
              };
            });
           
            Navigate(`/app/chat/${response.data.chats.convoId}`)
            
          }

       } catch (error) {
         console.log("error in starting new chat", error);
       }
  }

  return (
    <div
    className={`
     ${hasBorder ? 'border-4 border-black' : ""}
     ${isLarge ? 'h-32' : 'h-12'}
     ${isLarge ? 'w-32' : 'w-12' }
     rounded-full
     hover:opacity-90
     transition
     relative
     cursor-pointer    
    `}>

      <button onClick={hanldeClick}>
        <img
        height={isLarge ? 'h-32' : 'h-12'}  
        width={isLarge ? 'w-32' : 'w-12' }
        src={profileImage || profile} 
        alt="Avatar" 
        className="fill object-cover rounded-full " />
      </button>


      </div>
  )
}

export default Avatar
