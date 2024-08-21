"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
    Home,
    Package,
    ClipboardPenLine,
    MonitorCheck, Puzzle
  } from "lucide-react"

const SideBarLinks = () => {
    const pathname = usePathname();
  return (
    <div className="flex-1 pt-5">
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
  </div>
  )
}

export default SideBarLinks
