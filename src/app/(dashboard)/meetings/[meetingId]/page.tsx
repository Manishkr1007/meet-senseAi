import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ErrorBoundary } from "react-error-boundary";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { MeetingIdView, MeetingsIdViewError, MeetingsIdViewLoading } from "@/modules/meetings/ui/views/meeting-id-view";

interface Props {
    params:Promise<{
        meetingId: string;
    }>;
}
const Page = async({params}:Props)=>{
    const { meetingId } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session){
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({
        id: meetingId,
    }));
    //todo transcript
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsIdViewLoading />}>
              <ErrorBoundary fallback={<MeetingsIdViewError />}>
                <MeetingIdView meetingId={meetingId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
                
    );
}
export default Page;