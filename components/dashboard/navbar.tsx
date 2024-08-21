'use client'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";
// import { SignOutButton } from "@clerk/nextjs";
import {
    Car,
    ClipboardPenLine,
    Home,
    LogOut,
    Menu,
    MonitorCheck,
    Package,
    Puzzle,
  } from "lucide-react";
  import Link from "next/link";
import Image from 'next/image';
import { Togglebtn } from '../ui/togglebtn';
import { UserButton } from '@clerk/nextjs';
// import { logo } from '@/public/images';

const NavBar= () => {
    const pathname = usePathname();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-primary px-4 lg:h-[60px] lg:px-6 sticky">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-black">
          <nav className="grid gap-2 text-lg font-medium">
          <Link
        href="/dashboard"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-secondary-foreground transition-all",
        {
          'bg-primary': pathname === "/dashboard",
        },
        ) 
        }
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/dashboard/clubs"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-secondary-foreground transition-all",
        {
          'bg-primary': pathname === "/dashboard/clubs",
        },
        ) 
        }
      >
        <Puzzle className="h-4 w-4" />
        Clubs
      </Link>
      <Link
        href="/dashboard/elections"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-secondary-foreground transition-all",
        {
          'bg-primary text-white text-muted': pathname === "/dashboard/elections",
        },
        ) 
        }
      >
        <Package className="h-4 w-4" />
        Elections
      </Link>
      <Link
        href="/dashboard/ballotpapers"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-secondary-foreground transition-all",
        {
          'bg-primary text-white text-muted': pathname === "/dashboard/ballotpapers",
        },
        ) 
        }
      >
        <ClipboardPenLine className="h-4 w-4" />
        Ballot Papers
      </Link>
      <Link
        href="/dashboard/votes"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-secondary-foreground transition-all",
        {
          'bg-primary text-white text-muted': pathname === "/dashboard/votes",
        },
        ) 
        }
      >
        <MonitorCheck className="h-4 w-4" />
        Votes
      </Link>
          </nav>
          <div className="mt-auto">
          
            <Button>
                <LogOut />
                <p className='ml-3'>
                Logout
                </p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full flex justify-between items-center'>
        <p className='text-center font-bold text-xl text-black'>Voting System - Admin</p>
        <div className='flex gap-3'>
        <Togglebtn />
        <UserButton />
        </div>
      </div>
      
    </header>
  )
}

export default NavBar
