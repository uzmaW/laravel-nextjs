"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/contexts/taskContext";
import { useTask } from "@/hooks/task";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {useToast} from "@/components/toast/use-toast";

const formSchema = z.object({
    email: z.string().email({
    message: "Invalid email address.",
  }),
});


export default function AssignTaskForm({
  close,
  taskId,
}) {
  const { assignTask } = useTask();
  const { refetchTasks } = useTasks();
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    try {
    const res = await assignTask(taskId , values.email);
    toast({
      // title: 'Task assigned to user.',
      description: 'Task assigned successfully.'
    })
    refetchTasks();
    close(false);
    } catch (e) {
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "This email is not registered with us.",
        })
    close(false);
      // console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-7xl"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem style={{ margin: 0 }}>
              <FormLabel>User email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the email of the user.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={"flex justify-between gap-2 py-2"}>
          <Button
            className="w-full"
            type="button"
            variant={"outline"}
            size={"sm"}
            onClick={() => close(false)}
          >
            Cancel
          </Button>
          <Button className="w-full" size={"sm"}>
            Assign
          </Button>
        </div>
      </form>
    </Form>
  );
}
