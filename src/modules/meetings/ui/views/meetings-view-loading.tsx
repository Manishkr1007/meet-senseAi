import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const MeetingsViewLoading = () => (
  <LoadingState
    title="Loading agent"
    description="This may take a few seconds"
  />
);

export const MeetingsViewError = () => (
  <ErrorState title="Agent Load Error" description="An error occurred." />
);
