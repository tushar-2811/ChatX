import ChatFooter from "@/components/ChatFooter";
import { useParams } from "react-router-dom";

const PersonChat = () => {
  const params = useParams();

  return (
    <div className="border-2 border-green-600 h-screen mx-8 flex flex-col">
      {/* header of chat */}
    

      {/* Content area */}
      <div className="flex-1 overflow-y-auto mx-4 max-w-[1024]">
        {/* Add your chat content here */}
          
      </div>

      {/* Footer */}
      <div className="sticky bottom-2 ">
        <ChatFooter />
      </div>
    </div>
  );
};

export default PersonChat;
