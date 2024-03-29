import {useTasks} from "@/contexts/taskContext";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import TaskStatusBadge from "@/components/tasks/task-status-badge";
import TaskCard from "@/components/tasks/task-card";


export default function TaskList({type}) {
    const {tasks, assignedTasks} = useTasks()

    const getTaskType = (type) => {
        switch (type) {
            case 'pending':
                return tasks.filter((task) => task.status === 'pending')
            case 'completed':
                return tasks.filter((task) => task.status === 'completed')
            case 'assigned':
                return assignedTasks
            case 'in_progress':
                return tasks.filter((task) => task.status === 'in_progress')
            default:
                return tasks
        }
    }

    return (
        <>
            {getTaskType(type).map((task) => (
                <div key={task.id} className='py-2 px-2'>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className='flex py-2 gap-4 justify-center items-center max-w-80'>
                                    <p className='truncate text-sm lg:text-md'>
                                        {task.title}
                                    </p>
                                    <TaskStatusBadge status={task.status}/>
                                    {task.assignedBy && (
                                        <div className="flex mb-2">
                                            <span className="text-sm text-gray-500 mr-2">Assigned By:</span>
                                            <span className="text-sm text-gray-700">{task.assignedBy.name}</span>
                                        </div>
                                    )}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {task?.title.length && <TaskCard task={task}/>}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </>
    )
}