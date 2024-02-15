import {atom} from 'recoil'

interface Conversation {
    convoId : string
    anotherUser : {
        id : string
        userName : string
        profilePicture : string
    }

}

export const sidebarConvo = atom({
    key : "sidebarConvo", 
    default : {
        chats : [] as Conversation[]
    }
})