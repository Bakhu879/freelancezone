'use client'
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Key, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { Label } from "@/components/ui/label"
import { login, loginCredentials } from '@/lib/action/login-action';

const LoginPannel = () => {
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType');
  const [isPending,startTransition]=useTransition();
  const [user,setUser]=useState(userType)
  useEffect(() => {
    if (userType === 'Employee') {
      setUser('Employee');
    } else {
      setUser('Candidate');
    }
  }, [userType]);

  const toggleUser = () => {
    setUser((prev) => (prev === 'Employee' ? 'Candidate' : 'Employee'));
  };
  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      {/* Top Section */}
      <div className="container mt-10 flex flex-col items-center gap-6 ">
        {/* Switch Buttons */}
        <div className="flex items-center gap-2">
          <Label htmlFor="user-switch">
            <Button
              variant={user === 'Candidate' ? 'default' : 'ghost'}
              onClick={() => setUser('Candidate')}
            >
              Candidate account
            </Button>
          </Label>

          <Switch id="user-switch" checked={user === 'Employee'} onCheckedChange={toggleUser} />

          <Label htmlFor="user-switch">
            <Button
              variant={user === 'Employee' ? 'default' : 'ghost'}
              onClick={() => setUser('Employee')}
            >
              Hirer account
            </Button>
          </Label>
        </div>

        {/* Login Form */}
        <div className="flex flex-col items-center justify-evenly gap-4 bg-gray-100 px-[100px] h-[400px] ">
          <p>
            Login as <span className="font-semibold">Hirer account</span>
          </p>

          <div className="flex flex-col gap-4 ">
         
         <form action={(formData:FormData)=>{
              startTransition(()=>{
                loginCredentials(formData);
              })
         }}>
             <div className="flex items-center border rounded px-2">
              <User className="mr-2" />
              <input
                type="text"
                name="email"
                placeholder="User ID"
                className="outline-none bg-transparent py-2"
              />
            </div>
             <div className="flex items-center border rounded px-2">
              <Key className="mr-2" />
           
            <input
              type="password"
              name="password"
              placeholder="Password"
             className="outline-none bg-transparent py-2"
            />
            </div>


            <div className="flex justify-between items-center">
              <label>
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>
              <Button type='submit'>LOGIN</Button>
            </div>
         </form>

         {user==="Candidate" && ( <div className="flex flex-col items-center gap-2">
            <p>or sign in with</p>
            <div className="flex gap-2">
              <Button variant="outline">Facebook</Button>
              <Button variant="outline" onClick={login}>Google</Button>
            </div>
          </div>)}
          </div>
        </div>

        {/* Forgot & Signup */}
        <div className="text-sm text-blue-600 cursor-pointer hover:underline">
          Forgot Password?
        </div>

        <div className="text-center mt-4 border p-6">
          <p className="mb-2">Not a member yet?</p>
          <div className="flex gap-2 flex-wrap justify-center mb-2">
            <Button variant="default">CREATE CANDIDATE ACCOUNT</Button>
            <Button variant="default">CREATE HIRER ACCOUNT</Button>
          </div>
          <p className="text-xs">IT'S FREE!</p>
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default LoginPannel;
