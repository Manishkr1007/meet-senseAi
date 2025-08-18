"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { NewAgentDialog } from "./new-agent-dialog";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";
import { is } from "drizzle-orm";

export const AgentsListHeader = () => {
        const[filter,setFilter] =useAgentsFilters();
        const [isDialogOpen, setDialogOpen] = useState(false);
        const isAnyFilterModified =!!filter.search;
        const onClearFilters =()=>{
            setFilter({
                search:"",
                page:DEFAULT_PAGE,
            })
        }
    return (
        <>
        <NewAgentDialog open={isDialogOpen}  onOpenChange={setDialogOpen}/>
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xl">My Agents</h5>
                <Button onClick={()=>setDialogOpen(true)} >
                <PlusIcon />
                 New Agent
                 </Button>
            </div>
            <ScrollArea className="py-2">
            <div className="flex items-center gap-x-2 p-1 ">
                <AgentsSearchFilter />
                {isAnyFilterModified && (
                    <Button variant="outline" size="sm" onClick={onClearFilters} >
                        <XCircleIcon/>
                        Clear
                    </Button>
                    )}
            </div>
            <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </div>
        </>
    )
} 