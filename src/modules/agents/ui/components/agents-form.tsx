import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgentsGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentsInsertSchema } from "../../schemas";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner";
interface AgentsFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    intialValues?: AgentsGetOne;
};
export const AgentsForm = ({
    onSuccess,
    onCancel,
    intialValues,
}: AgentsFormProps) => {
    const trpc = useTRPC();
    // const router = useRouter();
    const queryClient = useQueryClient();
    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions(),
                );
                if (intialValues?.id) {
                    queryClient.setQueryData(
                        trpc.agents.getOne.queryKey({ id: intialValues.id }),
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
    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: intialValues?.name ?? "",
            instructions: intialValues?.instructions ?? "",
        },
    });
    const isEdit = !!intialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = async (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            console.log("TODO:updateAgent")

        }
        else {
            createAgent.mutate(values);
        }
    }
    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar
                    seed={form.watch("name")}
                    variant="bottsNetural"
                    className="border size-16" />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Math tutor" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="You are a helpful math assistant that can answer questions and help with assignments." />
                            </FormControl>
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
    )
}          
