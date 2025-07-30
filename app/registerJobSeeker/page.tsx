'use client'
import { registerJobSeeker } from '@/lib/action/register-action'
import { IdCard } from 'lucide-react'
import Link from 'next/link'
import React, { useTransition } from 'react'

const RegisterJobSeeker = () => {

  const[isPending, startTransition]=useTransition();
  return (
    <div>
        <div>
            <h1><IdCard/>NEW SIGN UP</h1>
            <h2>Candidate Account</h2>
        </div>
        <Link href="">Looking to hire? Click here for Hirer</Link>
        <p>Please fill up all required information</p>
       <form action={(formData:FormData)=>{

          startTransition(()=>{
            registerJobSeeker(formData)
          })
       }}>
        <input type="email" placeholder='email' name="email"/>
        <input type="passowrd"  placeholder='password' name="password"/>
        <button type='submit'>Create New Account</button>
       </form>
    </div>
  )
}

export default RegisterJobSeeker