'use client';
import { Button } from './ui/button'
import { ArrowLeft,   } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MobileSidebar from './Mobile-sidebar'
import { toast } from "sonner"


import {
    LogOut,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const Navbar = () => {
    const pathName = useLocation().pathname;
    const Navigate = useNavigate();
    
    return (
        <div className='flex top-0 sticky items-center p-4 bg-black/10' >
            <MobileSidebar />

            <div className='flex w-full justify-start'>
                {
                    pathName !== "/app" ? <Button className='bg-black' onClick={() => Navigate(-1)} >
                        <ArrowLeft className=' hover:cursor-pointer' />
                    </Button> : <div></div>
                }
            </div>

            <div className='flex w-full justify-center'>
                {
                    <Button variant={'premium'} >
                       Tushar Rawat
                    </Button>
                }
            </div>

            <div className='flex w-full justify-end hover:cursor-pointer'>
                <DropdownMenu>

                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="/hacker.png" />
                            {/* <AvatarImage src="https://cdn-icons-png.flaticon.com/128/4128/4128176.png" /> */}
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className='flex-1' >My Account  </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4 text-pink-500" />
                                <span>Profile</span>

                            </DropdownMenuItem>

                           

                       


                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast( "Logout Successful")} >
                            <LogOut className="mr-2 h-4 w-4 text-red-500" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>

                </DropdownMenu>

            </div>

        </div>
    )
}

export default Navbar
