import { selector } from "recoil";
import { authStore } from "../atoms/authStore";

export const authSelector = selector({
    key : "authSelector",
    get : ({get}) => {
        return get(authStore);
    },
    set : ({set} , value) => {
        return set(authStore, value)
    }
})