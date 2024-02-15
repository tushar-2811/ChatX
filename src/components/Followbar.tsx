import Avatar from './Avatar';
import {useEffect , useState} from 'react';
import { ClipLoader } from "react-spinners";
import axios from 'axios'




const FollowBar = () => {
    const [isLoading , setisLoading] = useState(true);
    const [Users , setUsers] =  useState([]);

    useEffect(() => {
        const fetchData = async() => {
          const {data} = await axios.get("https://chatx-server-1.vercel.app/api/v1/users/get-all");
          setUsers(data.allUsers.filter((user:any) => {
            return user.id !== localStorage.getItem("userID");
          }));
          setisLoading(false);
        }
        
        fetchData();
    },[])
   

    if(isLoading) {
      return (
        <div className='flex justify-center items-center mt-80'>
           <ClipLoader color='lightblue' size={80}/>
        </div>
      )

    }
  return (
    <div className='hidden px-6 py-4 lg:block min-w-60 '>
        <div className="bg-black/80 rounded-xl p-4 h-full">
        <h2 className='text-white text-xl font-semibold' >People to Chat</h2>
          <div className='flex flex-col gap-6 mt-4'>
          {/* <Avatar userId="123" profileImage={placeholder} isLarge={false} /> */}
          {
                  Users?.map((user:any) => (
                    <div key={user.id} className='flex flex-row gap-4'>
                      <Avatar name={user.username} userId={user.id} profileImage={user.profilePicture} isLarge={false} />
                      <div className='flex flex-col'>
                        <p className='text-white font-semibold text-sm' > {user.username} </p>
                        <p className='text-neutral-400 text-sm '> {user.email} </p>
                      </div>
                    </div>
                  ))
                 }
          </div>
        </div>
    </div>
  )
}

export default FollowBar
