'use client'
import Image from 'next/image'
import React,{useState}from 'react'
import { Button } from "@/components/ui/button"
import { LogInIcon } from 'lucide-react';
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Session } from 'next-auth';
import { logout } from '@/lib/action/login-action';
const Navbar = ({session}:{session:Session|null}) => {
  
  const [open,setOpen] =useState(false);
  const router = useRouter()
  const goToCandidateLogin = () => {
     setOpen(false)
    router.push('/loginPanel?userType=Candidate')
  }
  const goToHirerLogin = () => {
     setOpen(false)
    router.push('/loginPanel?userType=Employer')
  }
  
  return (
   <nav className="flex justify-between items-center p-4 bg-white shadow-md">
  {/* Left - Search Icon (only on small screens) */}
  <div className="block lg:hidden">
    <button>
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.65 6.15z"
        />
      </svg>
    </button>
  </div>

  {/* Center - Logo */}
  <div className="block lg:hidden ">
    <Image src={"/logo.png"} alt='logo' height={24} width={24}/>
  </div>

  {/* Right - Menu Icon (only on small screens) */}
  <div className="block lg:hidden">
    <button>
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>

  {/* Full nav - visible on medium+ screens */}
  <div className="hidden lg:flex w-full justify-between items-center">
    <div>
      <p className="text-lg font-bold text-red-600">
        FREELANCEZONE<span className="text-black text-sm font-extralight">Singapore</span>
      </p>
    </div>
    <div className="flex gap-3 text-sm text-black font-bold text-xs">
      <span>BROWSE JOBS</span>
      <span>FREELANCE MARKETPLACE</span>
      <span>PRICING PLANS</span>
    </div>
    <div className="flex gap-2 border-l px-8 border-black">
      {!session?(  <>
       <Button  variant={"ghost"} className='hover:text-red-500 hover:border-red-500 hover:border-1 font-semibold'>Sign Up</Button>
     
           {/* Dialog for Login */}
          <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
              <Button className='items-center gap-2 rounded-4xl py-5 font-bold px-8'>
                <LogInIcon size={16}  />
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md top-[200px] left-1/2 transform -translate-x-1/2 fixed">
              <DialogHeader> 
                <DialogTitle className='flex justify-center font-light'>Please select login type</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-4 w-sm">
                <Button onClick={goToCandidateLogin} variant="outline" className='bg-red-500 text-white p-6 text-lg'>CANDIDATE ACCOUNT</Button>
                <Button onClick={goToHirerLogin} variant="outline" className='bg-black text-white p-6 text-lg'>HIRER ACCOUNT</Button>
              </div>
            </DialogContent>
          </Dialog></>):(
            <Button onClick={logout}>Logout</Button>
          )}
   
    </div>
  </div>
</nav>

  )
}

export default Navbar