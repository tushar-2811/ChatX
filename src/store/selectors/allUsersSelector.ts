import { selector } from "recoil";
import { allUsersState } from "../atoms/allUsersAtoms";

export const allUsersSelector = selector({
    key : "allUsersSelector",
    get : ({get}) => {
        return get(allUsersState);
    },
    set : ({set} , value) => {
        return set(allUsersState ,value);
    }
})