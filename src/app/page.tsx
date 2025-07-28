"use client";
import { authClient } from "@/lib/auth-client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const {data :session} = authClient.useSession();
  const [name ,setName] = useState("");
  const [email ,setEmail] = useState("");
  const [password ,setPassword] = useState("");
  const onSubmit =()=>{
    authClient.signUp.email({
      email,
      name,
      password,
    },{
      onError:()=>{
        alert("error");
      },
      onSuccess:()=>{
        alert("success");
      }
    });
  }
  if(session){
    return (
      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl">Welcome {session.user.name}</h1>
        <Button onClick={()=>authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }
  return (
    <div>
   <div className="flex flex-col gap-y-4">
    <Input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
    <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    <Button onClick={onSubmit}>create </Button>
   </div>
   
    <div className="flex flex-col gap-y-4 mt-4">
      <h1 className="text-2xl">Sign In</h1>
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <Button onClick={() => authClient.signIn.email({ email, password })}>Sign In</Button>
    </div>
    </div>
  );
}
