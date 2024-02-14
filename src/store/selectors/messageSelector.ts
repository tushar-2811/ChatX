import { selector } from "recoil";
import { messageStore } from "../atoms/messageAtom";

export const messagesSelector = selector({
    key : "messagesSelector",
    get : ({get}) => {
        return get(messageStore);
    },
    set : ({set} , value) => {
        return set(messageStore, value)
    }
})