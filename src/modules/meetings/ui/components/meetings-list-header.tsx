"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlusIcon ,CircleXIcon} from "lucide-react";
import {NewMeetingDialog} from "./new-meeting-dialog";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingFilters } from "../../hooks/use-meetings-filters";
import { DEFAULT_PAGE } from "@/constants";



export const MeetingsListHeader = () => {
    const [filters, setFilters] = useMeetingFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
     
    const isAnyFilterModified = !!filters.search || !!filters.status || !!filters.agentId
    const onClearFilters = () => {
        setFilters({
            search: "",
            status: null,
            page: DEFAULT_PAGE,
            agentId: "",
        });
    }
    return (
        <>
     <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xl">My Meetings</h5>
                <Button onClick={()=>(setIsDialogOpen(true))} >
                <PlusIcon />
                 New Meeting
                 </Button>
            </div>
            <ScrollArea className="py-2">
            <div className="flex items-center gap-x-2 p-1">
              <MeetingsSearchFilter />
              <StatusFilter />
              <AgentIdFilter />
              {
                isAnyFilterModified && (
                    <Button variant="outline" onClick={()=>(onClearFilters())} >
                        <CircleXIcon  className="size-4"/>
                        Clear
                    </Button>
                )
              }
            </div>
            <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </div>
        </>
    )
} 