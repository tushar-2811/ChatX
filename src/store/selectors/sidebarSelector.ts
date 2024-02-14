import { selector } from "recoil";

import { sidebarConvo } from "../atoms/sidebarConvoAtoms";

export const sidebarSelector = selector({
    key : "sidebarSelector",
    get : ({get}) => {
        return get(sidebarConvo);
    },
    set : ({set} , value) => {
        return set(sidebarConvo, value)
    }
})