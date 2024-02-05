import {z} from "zod"

export const conversationSchema = z.object({
    prompt : z.string().min(1 , {
        message : "Message is Required"
    })
})