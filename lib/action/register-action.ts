'use server'

import { signIn } from "@/auth"
import { schema } from "../schema";
import { prisma } from "@/prisma";

export async function registerJobSeeker(formData: FormData) {
 const email = formData.get("email");
 const password =formData.get("password");
 const validateData = schema.parse({email,password})
 await prisma.user.create({
  data:{
    email:validateData.email.toLowerCase(),
    password:validateData.password,
  }
 })
 
}