import { Button } from "./ui/button"


const Header = () => {
  return (
    <div className='top-0 h-12 mb-4 border-2 w-full flex justify-between items-center px-12 py-8' >
         <div className='hover:cursor-pointer' >
       
            <h1 className='text-4xl font-mono text-transparent bg-clip-text bg-gradient-to-r 
      from-purple-400 to-sky-600'> ChatX</h1>
          
         </div>
         <div>
         
           <Button
           variant={"premium"}
             >               
                Connection Matters            
            </Button>
            
         </div>
    </div>
  )
}

export default Header
