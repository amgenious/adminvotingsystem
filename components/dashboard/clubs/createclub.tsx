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
import { addDoc, collection, query, serverTimestamp,} from "firebase/firestore";
import { db } from "@/lib/firebase"
import { Loader } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import { uploadFile, getFile } from "@/lib/storage";

export function Createclub() {
  const {user}=useUser()
  const {toast} = useToast()
  const [uploading, setUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState();  
  const [name, setName] = useState("");
  const [abbr, setAbbr] = useState("");

  const handleUpload = async () => {
    setUploading(true);
     try {
      const folder = "logos/";
      const imagePath = await uploadFile(selectedFile, folder);
      const imageUrl = await getFile(imagePath);
      saveDetails(imageUrl)
    } catch (error) {
      toast(
        {
          title:`Club not created, ${error}`,
        }
      )
      console.error("Error uploading image:", error);
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };
  const saveDetails =async(imageUrl:any) => {
    await addDoc(collection(db,"clubs"),{
      name:name,
      abberiviation:abbr,
      logo:imageUrl,
      creator:user?.primaryEmailAddress?.emailAddress,
      members:{},
      timeStamps: serverTimestamp(), 
    })
    toast(
      {
        title:"Club created successfully",
      }
    )
    setUploading(false)
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Create Club</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Club</SheetTitle>
          <SheetDescription>
            Fill the forms below to create a club. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Club Name
            </Label>
            <Input id="name" placeholder="Club Name" className="col-span-3"  onChange={(e) => setName(e.target.value)}  required/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="logo" className="text-center">
              Logo
            </Label>
            <Input id="logo" type="file" className="col-span-3"  onChange={(e:any) => setSelectedFile(e.target.files[0])} required/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="abbr" className="text-center">
              Abbr.
            </Label>
            <Input id="abbr" placeholder="Club Abbreviatoin" className="col-span-3"  onChange={(e) => setAbbr(e.target.value)} required/>
          </div>
        </div>
        <SheetFooter>
          <Button
           onClick={handleUpload}
          >{
        uploading ? (
          <>
          <p>Creating Club </p>
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
