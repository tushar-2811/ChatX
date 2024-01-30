import TypewriterComponent from 'typewriter-effect';

const LandingHero = () => {
  return (
    <div className='text-white font-mono font-bold py-36 text-center space-y-8'>
       
    <div className='text-4xl sm:text-5xl  md:text-6xl lg:text-7xl font text-black font-extrabold space-y-5'>
     <h1> Connecting People Randomly</h1>
     <div className='text-transparent bg-clip-text bg-gradient-to-r 
      from-purple-400 to-sky-600  '>
         
         <TypewriterComponent 
            options={{
             strings : [
                 " Chat Happily !",
                 " Unexpected Conversations Await !",
                
             ],
             autoStart : true,
             loop : true
            }}
         />

     </div>

    </div>

    <div className='text-sm md:text-2xl font-medium text-zinc-500'>
      Feeling Alone ? 
    </div>

    <div className='text-sm md:text-xl text-transparent bg-clip-text bg-gradient-to-r  from-purple-400 to-pink-600 '>
      Talk to people, from different parts of the world.
    </div>

 </div>
  )
}

export default LandingHero
