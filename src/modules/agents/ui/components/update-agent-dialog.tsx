import {ResponsiveDialog} from "@/components/responsive-dialog";
import { AgentsForm } from "./agents-form";
import { AgentsGetOne } from "../../types";

interface UpdateAgentDialogProps {
    open: boolean;  
    onOpenChange: (open:boolean) => void;
    initialValues?: AgentsGetOne;
};

export const UpdateAgentDialog = ({open, onOpenChange,initialValues}:UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="Edit Agent" description="Edit agent details">
         <AgentsForm
         onSuccess={()=>onOpenChange(false)}
            onCancel={()=>onOpenChange(false)}
            intialValues={initialValues}
         />
        </ResponsiveDialog>
    );
};