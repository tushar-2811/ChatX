import ChatFooter from "@/components/ChatFooter";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const PersonChat = () => {
  const params = useParams();
  const secondPersonId = params.id;
  const firstPersonId = localStorage.getItem("userID");

  const sendMessage = async() => {
     try {
       // call the api 
     } catch (error) {
       console.log(error);
       toast("error while sending message");
     }
  }

  return (
    <div className="border-2 border-green-600 h-screen mx-8 flex flex-col">
      {/* header of chat */}
    

      {/* Content area */}
      <div className="flex-1 overflow-y-auto mx-4 max-w-[1024]">
        {/* Add your chat content here */}
        <p> {firstPersonId} </p>
        <p> {secondPersonId} </p>
          
      </div>

      {/* Footer */}
      <div className="sticky bottom-2 ">
        <ChatFooter />
      </div>
    </div>
  );
};

export default PersonChat;
