import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Homeview } from "@/modules/home/ui/views/home-view";
import {caller} from "@/trpc/server";
import { redirect } from "next/navigation";


const Page = async () => {
  const data = await caller.hello({text:"hello manish"});
   const session = await auth.api.getSession({
    headers: await headers(),
   });
   if(!session) {
    redirect("/sign-in");
   }
   return <p>{data.greeting}</p>
return <Homeview />
};
export default Page;