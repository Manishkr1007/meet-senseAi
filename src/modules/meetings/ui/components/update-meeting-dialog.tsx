import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initalValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initalValues,
}: UpdateMeetingDialogProps) => {
  return (
       <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="Edit Meeting" description="Edit the meeting details">
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initalValues}
      />
    </ResponsiveDialog>
  );
};
