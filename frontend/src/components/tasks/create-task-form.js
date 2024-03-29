'use client';

import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {FaCalendar} from "react-icons/fa6"
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {format} from "date-fns"
import {Calendar} from "@/components/ui/calendar"
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {useTask} from "@/hooks/task";
import {useTasks} from "@/contexts/taskContext";

const formSchema = z.object({
    title: z.string().min(6, {
        message: 'Title must be at least 6 characters.',
    }),
    description: z.string().max(255, {
        message: 'Description too long.',
    }),
    due_date: z.date({
        required_error: "A due date is required.",
    })
});

function CreateTaskForm({close}) {
    const {createTask} = useTask();
    const {refetchTasks} = useTasks();
    const [showCalender, setShowCalender] = useState(false);
    const [errors, setErrors] = useState([]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            due_date: new Date(),
        },
    });

    async function onSubmit(values) {
        const res = await createTask({
            title: values.title,
            description: values.description,
            due_date: format(values.due_date, "yyyy-MM-dd"),
            setErrors
        });
        refetchTasks()
        close(false)
    }

    return (
        <div className="px-6 py-5 lg:px-6">
            <div className="sm:mx-auto sm:max-w-sm">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 max-w-7xl"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem style={{margin: 0}}>
                                    <FormLabel>Task title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Task title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {/*Please enter a title for your task.*/}
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem className="">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Write something about your task" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>Task description</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="due_date"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-center">
                                    {/*<FormLabel>Due date</FormLabel>*/}
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            onClick={() => setShowCalender(!showCalender)}
                                            type={'button'}
                                        >
                                            {field.value ? (
                                                format(field.value, "MM-dd-yyyy")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <FaCalendar className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                    {showCalender && (<Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date()
                                        }
                                        initialFocus
                                    />)}
                                    {/*<FormDescription>*/}
                                    {/*    When you plan on finishing the task*/}
                                    {/*</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className={'flex justify-between gap-2 py-2'}>
                            <Button
                                className="w-full"
                                type="button"
                                variant={'outline'}
                                size={'sm'}
                                onClick={() => close(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full"
                                size={'sm'}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreateTaskForm;