
import { CommandDialog, CommandInput, CommandList,CommandItem } from "@/components/ui/command"
import { Dispatch, SetStateAction } from "react";
interface Props {
    open?: boolean;
    setOpen?:Dispatch<SetStateAction<boolean>>;
}
export const DashboardCommand = ({ open = true, setOpen }: Props) => {
    return(
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
            placeholder="Find a meeting or agent"/>
            <CommandList>
                <CommandItem>
                    test
                </CommandItem>
            </CommandList>
        </CommandDialog>
    );
};
  