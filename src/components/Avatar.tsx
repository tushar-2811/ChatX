import axios from "axios";
import profile from "../assets/placeholder.png"


import {  useSetRecoilState , useRecoilValue } from 'recoil';
import { sidebarSelector } from '@/store/selectors/sidebarSelector';
import { useNavigate } from "react-router-dom";


interface AvatarProps {
    userId : string;
    isLarge ?: boolean;
    hasBorder ?: boolean;
    profileImage ?: string;
}



const Avatar:React.FC<AvatarProps> = ({userId , isLarge ,hasBorder , profileImage }) => {
  const conversations = useRecoilValue(sidebarSelector);
  const setConversations = useSetRecoilState(sidebarSelector);
  const Navigate = useNavigate();

  const handleClick = async() => {
   
       try {
          const response = await axios.get(`http://localhost:5000/api/v1/chats/get-chats/${String(localStorage.getItem("userID"))}/${String(userId)}`);

          if(response.data.ok ){
            if(response.data.newChatCreated){
              const newConversation = [...conversations.chats, response.data.chats];
              setConversations({
                chats: newConversation,
              });
            }
            console.log("conversation" , conversations);
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

      <button onClick={handleClick}>
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
