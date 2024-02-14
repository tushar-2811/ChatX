import {atom} from 'recoil'

export const sidebarConvo = atom({
    key : "sidebarConvo", 
    default : {
        chats : []
    }
})