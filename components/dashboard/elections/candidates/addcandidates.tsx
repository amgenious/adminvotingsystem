"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader, UserPlus, UserRoundCheck } from "lucide-react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { uploadFile, getFile } from "@/lib/storage";
interface AddCandidatesProps {
  id: string;
  portfolios: any;
}

const AddCandidates: React.FC<AddCandidatesProps> = ({ id, portfolios }) => {
  const { toast } = useToast();
  const [fullname, setFullName] = useState("");
  const [port, setPort] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(); 
  const handleUpload = async () => {
    setUploading(true);
     try {
      const folder = "candidates/";
      const imagePath = await uploadFile(selectedFile, folder);
      const imageUrl = await getFile(imagePath);
      saveDetails(imageUrl)
    } catch (error) {
      toast(
        {
          title:`Candidate not added, ${error}`,
        }
      )
      console.error("Error uploading image:", error);
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };
  const saveDetails =async(imageUrl:any) => {
    const docRef = doc(db, "elections", id);
    await updateDoc(docRef, {
      candidates: arrayUnion({fullname,port,imageUrl}),
    });
    toast({
      title: "Candidate added",
    });
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">
          <UserRoundCheck />
          <p className="text-xs ml-2">Add Candidate</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Candidates</SheetTitle>
          <SheetDescription>Add candidates to this Election.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-center">
              Full Name
            </Label>
            <Input
              id="fullname"
              placeholder="Full Name"
              className="col-span-3"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="porfolio" className="text-center">
              Porfolio
            </Label>
            <select className="col-span-3" onChange={(e) => setPort(e.target.value)}>
              <option disabled selected></option>
              {portfolios.map((item: any) => (
                <option key={item.id} value={item.id} >
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-center">
              Image
            </Label>
            <Input id="image" type="file" className="col-span-3" onChange={(e:any) => setSelectedFile(e.target.files[0])} required/>
          </div>
        </div>
        <SheetFooter>
          
            <Button type="submit" onClick={handleUpload}>
            {
        uploading ? (
          <>
          <p>Creating Election </p>
          <Loader size={20} className="animate-spin ml-2" />
          </>
        ):(
          "Add"
        )
      }
            </Button>
         
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddCandidates;
