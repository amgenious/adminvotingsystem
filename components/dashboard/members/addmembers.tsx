'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { UserPlus } from "lucide-react"
import { doc, updateDoc,arrayUnion,} from "firebase/firestore";
import { db } from '@/lib/firebase';
import React,{useState} from 'react'
import { useToast } from "@/components/ui/use-toast"
interface AddMembersProps {
  id: string;
}

const AddMembers:React.FC<AddMembersProps> =({id})=> {
  const {toast} = useToast()
  const [email,setEmail] = useState("")
  const addmember =async (e:any)=>{
    const docRef=doc(db,'clubs',id)
    await updateDoc(docRef,{
        members:arrayUnion(email)
    })
    toast(
      {
        title:"Member added",
      }
    )
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default"><UserPlus /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Member</SheetTitle>
          <SheetDescription>
            Add members to the Club. Only members can vote in the Club
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-center">
              Email
            </Label>
            <Input id="email" placeholder="Member Email" className="col-span-3"  onChange={(e) => setEmail(e.target.value)}  required/>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={addmember}>Add</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default AddMembers
