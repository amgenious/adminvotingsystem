import React from 'react'
import Getuser from '../sidebar/getuser'
import SideBarLinks from '../sidebar/sidebarlinks'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { SignOutButton } from "@clerk/nextjs";

const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col justify-between items-center p-5  h-full'>
      <div>
      <Getuser/>
      <SideBarLinks />     
      </div>
      <SignOutButton>
            <Button>
                <LogOut />
                <p className='ml-3'>
                Logout
                </p>
            </Button>
           </SignOutButton>
     </div>
  )
}

export default Sidebar