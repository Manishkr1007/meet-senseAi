import {ReactNode,useState} from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command";

interface Props{
    options:Array<{
        id:string
        value:string
        children:ReactNode
    }>;
    onSelect:(value:string) => void;
    onSearch?: (value:string) => void;
    value?: string;
    placeholder?: string;
    className?: string;
    isSearchable?: boolean;
    }

    export const CommandSelect = ({
        options,
        onSelect,
        onSearch,
        value,
        placeholder = "Select an option",
        className,
       
    }: Props) => {
        const [open, setOpen] = useState(false);
        const selectedOption = options.find((option) => option.value === value);
        return (
            <>
            <Button 
            onClick={() => setOpen(true)}
            type="button"
            variant="outline"
            className={cn("h-9 font-normal px-2 justify-between",!selectedOption && "text-muted-foreground", className)}
            >
             <div>
                {selectedOption?.children ?? placeholder}
             </div>  
                <ChevronsUpDownIcon className="size-4 ml-2" /> 
            </Button>
            <CommandResponsiveDialog
            shouldFilter={!onSearch}
            open={open}
            onOpenChange={setOpen}
            
            >
                <CommandInput placeholder="Search.." onValueChange={onSearch}/>
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No options found.
                        </span>
                    </CommandEmpty>
                    {options.map((option) => (
                        <CommandItem
                            key={option.id}
                            onSelect={() => {
                              onSelect(option.value);
                              setOpen(false);
                            }}>
                             {option.children}
                            </CommandItem>
                    ))}
                </CommandList>
            </CommandResponsiveDialog>
            </>
        )
    }
