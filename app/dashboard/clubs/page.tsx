import { Createclub } from '@/components/dashboard/clubs/createclub'
import Getallclubs from '@/components/dashboard/clubs/getallclubs'
import React from 'react'

const ClubsPage = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-secondary'>
    <div className='w-full p-3 h-fit bg-secondary flex justify-between'>
        <p className='text-3xl font-black'>Clubs</p>
        <Createclub />
        </div>
    <div className='p-3 h-full flex flex-col gap-5 border-[0.5px] border-primary bg-background rounded-xl'>
    <Getallclubs />
    </div>
   </div>
  )
}

export default ClubsPage