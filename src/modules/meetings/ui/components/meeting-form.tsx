import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeetingGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { meetingsInsertSchema } from "../../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Divide } from "lucide-react";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
interface MeetingFormProps {
    onSuccess: (id?: string) => void;
    onCancel: () => void;
    intialValues?: MeetingGetOne;
};
export const MeetingForm = ({
    onSuccess,
    onCancel,
    intialValues,
}: MeetingFormProps) => {

    const trpc = useTRPC();
    // const router = useRouter();
    const queryClient = useQueryClient();
    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
    const [agentSearch, setAgentSearch] = useState("");
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            search: agentSearch,
            pageSize: 100,
        }),
    );
    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: (data) => {
                queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
                // if (intialValues?.id) {
                //     queryClient.setQueryData(
                //         trpc.agents.getOne.queryKey({ id: intialValues.id }),
                //         intialValues,
                //     );
                // }
                onSuccess?.(data.id);
            },
            onError: (error) => {
                toast.error(error.message);
            },

        })
    )
    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
                if (intialValues?.id) {
                    queryClient.setQueryData(
                        trpc.meetings.getOne.queryKey({ id: intialValues.id }),
                        intialValues,
                    );
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
            },

        })
    )

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: intialValues?.name ?? "",
            agentId: intialValues?.agentId ?? "",
        },
    });
    const isEdit = !!intialValues?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending;

    const onSubmit = async (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({
                ...values,
                id: intialValues?.id,
            });

        }
        else {
            createMeeting.mutate(values);
        }
    }
    return (
        <>
        <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Math consultations" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="agentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Agent
                            </FormLabel>
                            <FormControl>
                                <CommandSelect
                                    options={(agents.data?.items ?? []).map((agent) => ({
                                        id: agent.id,
                                        value: agent.id,
                                        children: (
                                            <div className="flex items-center gap-x-2">
                                                <GeneratedAvatar
                                                    seed={agent.name}
                                                    variant="bottsNetural"
                                                    className="size-6 border" />
                                                <span className="font-semibold capitalize">
                                                    {agent.name}
                                                </span>
                                            </div>
                                        )
                                    }))}
                                    onSelect={field.onChange}
                                    onSearch={setAgentSearch}
                                    value={field.value}
                                    placeholder="Select an agent"
                                />
                            </FormControl>
                            <FormDescription>
                               Not found what you&apos;re looking for?{" "}
                                 <button
                                        type="button"
                                        className="text-primary hover:underline" 
                                        onClick={() => setOpenNewAgentDialog(true)}
                                  >
                                        Create a new agent
                                  </button> 
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between gap-x-2">
                    {onCancel && (
                        <Button variant="ghost" disabled={isPending} type="button" onClick={() => onCancel()}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button disabled={isPending} type="submit">
                        {isEdit ? "Update Agent" : "Create Agent"}
                    </Button>
                </div>
            </form>
        </Form>
        </>
    )
}          
