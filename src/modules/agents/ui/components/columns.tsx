"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { CornerDownRight, VideoIcon } from "lucide-react"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { AgentsGetMany } from "../../types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<AgentsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell:({row})=>(
        <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">
                <GeneratedAvatar
                    seed={row.original.name}
                    variant="bottsNetural"
                    className="size-6" />
                   <span className="font-semibold capitalize">{row.original.name}</span>
            </div>
           
                <div className="flex items-center gap-x-2">

                <CornerDownRight className="size-3 text-muted-foreground"/>
                <span className="text-xs text-muted-foreground max-w-[200px] truncate capitalize">
                    {row.original.instructions}
                </span>
                </div>
            </div>
     
    )
  },
  {
    accessorKey:"meetingCount",
    header:"Meetings",
    cell:({row})=>(
        <Badge
            className="flex items-center gap-x-2 [&>svg:size-4]"
            variant="outline">
            <VideoIcon className="text-blue-700"/>
            {row.original.meetingCount} {row.original.meetingCount === 1 ? "Meeting" : "Meetings"   }
            
        </Badge>
    )
  }


]