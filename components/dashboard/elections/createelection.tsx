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
import React,{useState,useEffect} from 'react'
import { useUser } from '@clerk/clerk-react';
import { addDoc, collection, serverTimestamp,} from "firebase/firestore";

import { db } from "@/lib/firebase"
import { Archive, Loader, Plus, Trash } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
interface CreateelectionProps {
    noc: string;
  }

const Createelection:React.FC<CreateelectionProps> =({noc})=> {
    const {user}=useUser()
    const {toast} = useToast()
    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState("");
    const [startdateandtime, setStartdateandtime] = useState("");
    const [enddateandtime, setEnddateandtime] = useState("");
    const [inputs, setInputs] = useState([{ id: 1, value: '' }]);

  const addInputField = () => {
    setInputs([...inputs, { id: inputs.length + 1, value: '' }]);
  };
  const removeInputField = (id:any) => {
    setInputs(inputs.filter(input => input.id !== id));
  };
  const handleInputChange = (id:any, value:any) => {
    setInputs(inputs.map(input => (input.id === id ? { ...input, value } : input)));
  };
  const generateuniqueid = (length:any) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `${result}`;
  };
  const handleUpload = async () => {
    setUploading(true);
     try {
        const filteredInputs = inputs.filter(input => input.value !== undefined && input.value.trim() !== "");
        await addDoc(collection(db,"elections"),{
            name:name,
            uniqueid:generateuniqueid(10),
            creator:user?.primaryEmailAddress?.emailAddress,
            startdateandtime:startdateandtime,
            enddateandtime:enddateandtime,
            noc:noc,
            candidates:{},
            portfolios:filteredInputs,
            timeStamps: serverTimestamp(), 
          })
          toast(
            {
              title:"Election created successfully",
            }
          )
          setUploading(false)
    } catch (error) {
      toast(
        {
          title:`Election not created, ${error}`,
        }
      )
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default"><Archive /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Election</SheetTitle>
          <SheetDescription>
            Fill the forms below to create an election. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nameofelection" className="text-center">
              Name of Election
            </Label>
            <Input id="nameofelection" placeholder="Name of Election" className="col-span-3"  onChange={(e) => setName(e.target.value)}  required/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startdate" className="text-center">
              Expected Start Date and Time
            </Label>
            <Input id="startdate" placeholder="" type="datetime-local" className="col-span-3"  onChange={(e) => setStartdateandtime(e.target.value)} required/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="enddate" className="text-center">
              Expected End Date and Time
            </Label>
            <Input id="enddate" placeholder="" type="datetime-local" className="col-span-3"  onChange={(e) => setEnddateandtime(e.target.value)} required/>
          </div>
          <div className='flex justify-between'>
           <p>Porfolios</p>
           <div className='cursor-pointer border-black rounded-lg border hover:border-primary hover:text-primary'
           onClick={addInputField}
           >
            <Plus />
           </div>
            </div>
          {inputs.map(input => (
       <div key={input.id} className="flex items-center gap-2">
       <input
         className="border-black border-2 rounded-sm p-2 flex-grow"
         placeholder="Porfolio"
         value={input.value}
         onChange={e => handleInputChange(input.id, e.target.value)}
       />
       <div
         className="cursor-pointer"
         onClick={() => removeInputField(input.id)}
       >
         <Trash className='text-red-700' />
       </div>
     </div>
      ))}
        </div>
        <SheetFooter>
          <Button
           onClick={handleUpload}
          >{
        uploading ? (
          <>
          <p>Creating Election </p>
          <Loader size={20} className="animate-spin ml-2" />
          </>
        ):(
          "Save"
        )
      }</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}


export default Createelection