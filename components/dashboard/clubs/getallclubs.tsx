"use client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash, UserRound, Loader } from "lucide-react"
import React,{useState, useEffect} from 'react'
import { useUser } from '@clerk/clerk-react';

import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase"
import Emptyinterface from "@/components/ui/emptyinterface"
import AddMembers from "../members/addmembers"
import Createelection from "../elections/createelection"



const Getallclubs = () => {
  const {user}=useUser()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "clubs");
  let me:any
  useEffect(() => {
    const fetchData = async () => {
    await getItems()
    }
    fetchData();
}, [
  me =user?.primaryEmailAddress?.emailAddress
]);
const getItems = async()=>{
  try {
    const q1 = query(
        colRef,
        where("creator","==",me),
        orderBy("timeStamps","desc")
    );
    const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
        setData([]);
        let list:any= [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list)
        setLoading(false);
    });
    return () => {
        unsubscribeSnapshot();
    };

} catch (error) {
    setLoading(false);
    console.error('Error fetching data:', error);
}
}
const deleteItem = async (id: any) => {
  try {
    await deleteDoc(doc(db, "clubs", id));
    setData((prevData) => prevData.filter((items: any) => items.id !== id));
  } catch (error) {
    console.log(error);
  }
};
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Clubs Created</CardTitle>
      </CardHeader>
      {data?.length > 0 && loading == false ? (
            data.map((item: any) => (
             <CardContent className="grid gap-8" key={item.id} >
             <div className="flex justify-between items-center">
             <div className="flex items-center gap-4">
               <Avatar className="hidden h-10 w-10 sm:flex">
                 <AvatarImage src={item.logo} alt="Avatar" />
                 <AvatarFallback>{item.abberiviation}</AvatarFallback>
               </Avatar>
               <div className="grid gap-1">
                 <p className="text-lg font-medium leading-none">{item.name}</p>
                 <div className="flex gap-2  items-center">
                 <p className="text-sm text-muted-foreground">
                   {item.abberiviation}
                 </p>
                 <p className="text-sm text-muted-foreground">Total Members {item.members.length}</p>
                 </div>
               </div>
             </div>
             <div className="flex items-center gap-4">
                 <AddMembers id={item.id} />
                <Createelection noc={item.name}  />
               <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button aria-haspopup="true" size="icon" variant="ghost">
                           <MoreHorizontal className="h-4 w-4" />
                           <span className="sr-only">Toggle menu</span>
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                         <DropdownMenuItem className="text-green-500 cursor-pointer"><Pencil /><p className="text-xs ml-1">Edit</p></DropdownMenuItem>
                         <DropdownMenuItem className="text-red-500 cursor-pointer"
                          onClick={(id) => deleteItem(item.id)}
                         ><Trash /><p className="text-xs ml-1">Delete</p></DropdownMenuItem>
                         <DropdownMenuItem className="text-blue-500 cursor-pointer"><UserRound /><p className="text-xs ml-1">Members</p></DropdownMenuItem>
                       </DropdownMenuContent>
                 </DropdownMenu>
                 </div>
             </div>
           </CardContent>
            ))
) : loading ? (
  <Loader
    size={40}
    className="animate-spin ml-2 text-primary text-center"
  />
) : (
  <Emptyinterface />
)
}
    </Card>
  )
}

export default Getallclubs



