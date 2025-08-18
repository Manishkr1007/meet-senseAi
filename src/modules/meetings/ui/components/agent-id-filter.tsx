import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useMeetingFilters } from "../../hooks/use-meetings-filters";
import { useTRPC } from "@/trpc/client";
import {  useQuery } from "@tanstack/react-query";
export const AgentIdFilter =()=>{
    const [filters,setFilters] = useMeetingFilters();
    const trpc =useTRPC();
    const [agentSearch, setAgentSearch] = useState("");
    const {data}=useQuery(
        trpc.agents.getMany.queryOptions({
            search: agentSearch,
            pageSize:100,
        }),
    );
     return (
        <CommandSelect
         className="h-9"
         placeholder="Agent"
         options={(data?.items??[]).map((agent) => ({
            value: agent.id,
            id: agent.id,
            children:(
                <div className="flex items-center gap-x-2">
                    <GeneratedAvatar
                    variant="bottsNetural"
                    seed={agent.name}
                    className="size-4"
                    
                    />
                    {agent.name}
                </div>
            )
        }))}
        onSelect={(value)=>setFilters({agentId:value})}
        onSearch={setAgentSearch}
        value={filters.agentId?? ""}

        />
     )
    
}