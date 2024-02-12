import { atom } from "recoil";

export const authStore = atom({
    key : "authStore", 
    default : {
        isSignedIn : !!localStorage.getItem("authToken")
    }
})