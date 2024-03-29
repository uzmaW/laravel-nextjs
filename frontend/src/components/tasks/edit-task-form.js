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
import {Textarea} from "@/components/ui/textarea"
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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";


const formSchema = z.object({
    title: z.string().min(6, {
        message: 'Title must be at least 6 characters.',
    }),
    description: z.string().max(255, {
        message: 'Description too long.',
    }),
    due_date: z.date({
        required_error: "Due date is required.",
    }),
    status: z.enum(['pending', 'in_progress', 'completed'], {
        required_error: "A status is required. Must be one of 'pending', 'in_progress', 'completed'"
    }),
    priority: z.enum(['low', 'mid', 'high'], {
        required_error: "A priority is required. Must be one of 'low', 'mid', 'high'"
    }),
});
export default function EditTaskForm({close, task}) {
    const {updateTask} = useTask();
    const {refetchTasks} = useTasks();
    const [showCalender, setShowCalender] = useState(false)
    const [errors, setErrors] = useState([]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: task.title,
            description: task.description,
            due_date: new Date(task.due_date),
            status: task.status,
            priority: task.priority
        },
    });

    async function onSubmit(values) {
        const res = await updateTask({
            id: task.id ,
            title: values.title,
            description: values.description,
            due_date: format(values.due_date, "yyyy-MM-dd"),
            status: values.status,
            priority: values.priority,
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
                                        <Textarea placeholder="Write something about your task" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>Task description</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className={'flex gap-20'}>
                            <FormField
                                control={form.control}
                                name="status"
                                render={({field}) => (
                                    <FormItem style={{margin: 0}}>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-[100px] px-2 ">
                                                    <SelectValue placeholder="Set priority"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>title</SelectLabel>
                                                    {['pending', 'completed', 'in_progress'].map((el, index) => (
                                                        <SelectItem key={index} value={el}>{el}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            {/*Please enter a title for your task.*/}
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({field}) => (
                                    <FormItem style={{margin: 0}}>
                                        <FormLabel>Priority</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-[100px] px-2 ">
                                                    <SelectValue placeholder="Set priority"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Priority</SelectLabel>
                                                    {['low', 'mid', 'high'].map((el, index) => (
                                                        <SelectItem key={index} value={el}>{el}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            {/*Please enter a title for your task.*/}
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <FormField
                            control={form.control}
                            name="due_date"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
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
                                            {field.value && !isNaN(field.value.getTime()) ? (
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
                                Update
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}