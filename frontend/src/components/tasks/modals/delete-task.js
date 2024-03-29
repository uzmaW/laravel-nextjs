'use client'


import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import React from "react";
import CreateTaskForm from "@/components/tasks/create-task-form";
import {useTask} from "@/hooks/task";
import {useTasks} from "@/contexts/taskContext";
import {useToast} from "@/components/toast/use-toast";
import {Button} from "@/components/ui/button";


export default function DeleteTask({open, setOpen, id}) {
    const cancelButtonRef = useRef(null)
    const {deleteTask} = useTask()
    const {refetchTasks} = useTasks()
    const {toast} = useToast()

    const handleSubmit = async () => {
        try {
            await deleteTask(id)
            toast({
                // title: 'Task assigned to user.',
                description: 'Task deleted successfully.'
            })
            refetchTasks()
            setOpen(false)
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
            })
            setOpen(false)
            throw e;
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="px-4 py-4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Delete Task
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete the task?
                                    </p>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <Button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-1 lg:py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={handleSubmit}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-1 lg:py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}