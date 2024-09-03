'use client'
import React,{useState,useEffect} from 'react'
import { Card, CardHeader, CardTitle} from '@/components/ui/card'
import { ClipboardPenLine, Package, Puzzle } from 'lucide-react'
import {auth,db} from "@/lib/firebase"
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useUser } from '@clerk/clerk-react';
const GetSelfStatsCard = () => {
  const {user}=useUser()
  const colRef1 = collection(db, "ballotpapers");
  const colRef2 = collection(db, "clubs");
  const colRef3 = collection(db, "elections");
  const [invoices, setInvoices] = useState([]);
  const [customerservicereports, setCustomerServiceReports] = useState([]);
  const [servicetrackers, setServiceTrackers] = useState([]);
  let me:any
  useEffect(()=>{
    try{
      const q1 = query(
        colRef1,
        where("creator","==",me)
      );
      const q2 = query(
        colRef2,
        where("creator","==",me)
      );
      const q3 = query(
        colRef3,
        where("creator","==",me)
      );
      const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
        let list:any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCustomerServiceReports(list.length);
        
      });
      const unsubscribeSnapshot1 = onSnapshot(q2, (snapShot) => {
        let list:any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setServiceTrackers(list.length);
      });
      const unsubscribeSnapshot2 = onSnapshot(q3, (snapShot) => {
        let list:any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setInvoices(list.length);
      });
      return () => {
        unsubscribeSnapshot();
        unsubscribeSnapshot1();
        unsubscribeSnapshot2();
      };
    }catch(errors){
      console.log(errors)
    }
  },[me =user?.primaryEmailAddress?.emailAddress])
  return (
    <div className="grid gap-5 md:grid-cols-4 grid-cols-1 w-full h-fit text-center">
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Clubs Created</CardTitle>
        <div className="text-2xl font-bold text-left">{servicetrackers}</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-green-400 rounded-md'>
    <Puzzle className="h-7 w-7 text-white" />
    </div>
        </div>
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium"> Elections Created</CardTitle>
        <div className="text-2xl font-bold text-left">{invoices}</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-orange-400 rounded-md'>
    <Package className="h-7 w-7 text-white" />
    </div>
        </div>
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium"> Ballot Papers Created </CardTitle>
        <div className="text-2xl font-bold text-left">{customerservicereports}</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-blue-400 rounded-md'>
    <ClipboardPenLine className="h-7 w-7 text-white" />
    </div>
        </div>
    </div>
  )
}

export default GetSelfStatsCard