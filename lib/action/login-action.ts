'use server'
import {signIn,signOut} from "@/auth"
import { redirect } from "next/navigation"


export const login =async ()=>{
    await signIn('google',{
        redirectTo:"/"
    })
}
export const logout =async ()=>{
    await signOut({
        redirectTo:"/"
    })
}

export const loginCredentials =async (formData:FormData)=>{
    await signIn('credentials',formData);
   
}