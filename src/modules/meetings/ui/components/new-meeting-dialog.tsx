import {ResponsiveDialog} from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import {MeetingForm} from "./meeting-form";

interface NewMeetingDialogProps {
    open: boolean;  
    onOpenChange: (open:boolean) => void;
};

export const NewMeetingDialog = ({open, onOpenChange}:NewMeetingDialogProps) => {
    const router = useRouter();
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="New Meeting" description="Create a new meeting">
          <MeetingForm 
          onSuccess={(id)=>{
            onOpenChange(false);
            router.push(`/meetings/${id}`); // Navigate to the new meeting page
            // Optionally, you can navigate to the new meeting page or perform other actions
          }}
            onCancel={()=>onOpenChange}
          />
        </ResponsiveDialog>
    );
};