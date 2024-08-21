"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Emptyinterface from "@/components/ui/emptyinterface";
import {
  ClipboardPenLine,
  Loader,
  MoreHorizontal,
  Trash,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


interface Candidate {
  fullname: string;
  imageUrl: string;
  port: string;
}

interface BallotPaper {
  id: string;
  name: string;
  noc: string;
  candidates: Candidate[];
  portfolios: Portfolio[]; 
}

interface Portfolio {
  id: number;
  value: string;
}

const Getallballotpapers: React.FC = () => {
  const { user } = useUser();
  const [data, setData] = useState<BallotPaper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const colRef = collection(db, "ballotpapers");

  useEffect(() => {
    const fetchData = async () => {
      await getItems();
    };
    fetchData();
  }, [user]);

  const getItems = async () => {
    try {
      const q1 = query(
        colRef,
        where("creator", "==", user?.primaryEmailAddress?.emailAddress),
        orderBy("timeStamps", "desc")
      );
      const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
        let list: BallotPaper[] = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as BallotPaper);
        });
        setData(list);
        setLoading(false);
      });
      return () => {
        unsubscribeSnapshot();
      };
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "elections", id));
      setData((prevData) => prevData.filter((items) => items.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getPortfolioValue = (
    portId: string,
    portfolios: Portfolio[]
  ): string => {
    const portfolio = portfolios.find((p) => p.id === Number(portId));
    return portfolio ? portfolio.value : "Unknown";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Elections Created</CardTitle>
      </CardHeader>
      {data.length > 0 && !loading ? (
        data.map((item) => (
          <CardContent className="grid gap-8" key={item.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center ">
                <Avatar className="hidden h-10 w-10 sm:flex justify-center items-center">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback>
                    <ClipboardPenLine />
                  </AvatarFallback>
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <DialogTitle className="cursor-pointer underline">
                      {item.name}
                    </DialogTitle>
                  </DialogTrigger>
                  <DialogContent className="w-full">
                    <DialogHeader>
                      <DialogTitle>{item.noc}</DialogTitle>
                    </DialogHeader>
                    <p>{item.name}</p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">
                            Portfolios
                          </TableHead>
                          <TableHead className="w-[100px]">
                            Candidate Picture
                          </TableHead>
                          <TableHead className="w-[100px]">
                            Candidate Name
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {item.candidates.map((candidate, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium border">
                              <p className="text-center p-1">
                                {getPortfolioValue(
                                  candidate.port,
                                  item.portfolios
                                )}
                              </p>
                            </TableCell>
                            <TableCell className="border">
                              <Avatar>
                                <AvatarImage
                                  src={candidate.imageUrl}
                                  alt="Avatar"
                                  className="object-contain w-20 h-20"
                                />
                                <AvatarFallback>
                                  <User />
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="border">
                              <p className="text-center p-1">
                                {candidate.fullname}
                              </p>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-4 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border p-2">
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash />
                    </DropdownMenuItem>
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
      )}
    </Card>
  );
};

export default Getallballotpapers;
