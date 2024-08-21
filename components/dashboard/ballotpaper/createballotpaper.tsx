'use client'
import React,{useState,useEffect} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/firebase';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { Loader } from 'lucide-react';
interface GenerateBallotPaperProps {
    creator: string;
    noc: string;
    name: string;
    uniqueid: string;
    candidates:any;
    portfolios: any;
    enddateandtime:string;
  }

const CreateBallotPaper: React.FC<GenerateBallotPaperProps> = ({ creator,noc,name,uniqueid,candidates, portfolios, enddateandtime }) => {
    const [generating, setGenerating] = useState(false)
    const handleUpload = async () => {
      setGenerating(true);
  
      try {
          const colRef = collection(db, "ballotpapers");
          const q = query(colRef, where("name", "==", name));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
              toast({
                  title: "Ballot Paper with this name already exists!",
                  variant: "destructive",
              });
              setGenerating(false);
              return; 
          }
          await addDoc(colRef, {
              name: name,
              uniqueid: uniqueid,
              creator: creator,
              enddateandtime: enddateandtime,
              noc: noc,
              candidates: candidates,
              portfolios: portfolios,
              timeStamps: serverTimestamp(),
          });
  
          toast({
              title: "Ballot Paper Generated Successfully",
              variant: "default",
          });
      } catch (error) {
          toast({
              title: `Ballot Paper was not generated, ${error}`,
              variant: "destructive",
          });
      } finally {
          setGenerating(false);
      }
  };
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Generate Ballot Paper</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Do you want to Generate Ballot Paper?</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center items-center gap-4 py-4">
            <Button className='bg-green-600 hover:bg-green-400' onClick={handleUpload}>Yes</Button>
            <DialogClose><Button type="submit">No</Button></DialogClose>
            </div>
            {
                generating ? (<div className='flex justify-center items-center w-full'>
                <Loader size={20} className="animate-spin ml-2"/>
                </div>):(<></>)
            }
          </DialogContent>
        </Dialog>
      )
}

export default CreateBallotPaper