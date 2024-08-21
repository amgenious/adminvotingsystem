import Getallelections from '@/components/dashboard/elections/getallelection'
import Emptyinterface from '@/components/ui/emptyinterface'
import React from 'react'

const ElectionsPage = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-secondary'>
    <div className='w-full p-3 h-fit bg-secondary flex justify-between'>
        <p className='text-3xl font-black'>Elections</p>
        </div>
    <div className='p-3 h-full flex flex-col gap-5 border-[0.5px] border-primary bg-background rounded-xl'>
      <Getallelections />
    </div>
   </div>
  )
}

export default ElectionsPage