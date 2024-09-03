import GetSelfStatsCard from '@/components/dashboard/overview/getselfstatscard'
import { Button } from '@/components/ui/button'
import Emptyinterface from '@/components/ui/emptyinterface'
import React from 'react'

const OverviewPage = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-secondary'>
    <div className='w-full p-3 h-fit bg-secondary'>
        <p className='text-3xl font-black'>Dashboard</p>
        </div>
    <div className='p-3 h-full flex flex-col gap-5 border-[0.5px] border-primary bg-background rounded-xl'>
    <GetSelfStatsCard />
    </div>
   </div>

  )
}

export default OverviewPage