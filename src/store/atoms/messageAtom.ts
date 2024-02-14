import { atom } from "recoil";

export const messageStore = atom({
    key : "messageStore", 
    default : {
        messages : []
    }
})