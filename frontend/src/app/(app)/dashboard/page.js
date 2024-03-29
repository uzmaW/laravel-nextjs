'use client'
import Header from '@/app/(app)/Header'
import Button from '@/components/Button'
import TaskCard from '@/components/tasks/task-card'
import TaskStateCard from '@/components/tasks/task-state-card'
import TaskFilter from '@/components/tasks/task-filter'
import TaskList from '@/components/tasks/task-list'
import CreateTask from '@/components/tasks/modals/create-task'
import { FaPlusCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useTasks } from '@/contexts/taskContext'
import { useAuth } from '@/hooks/auth'
import { useTask } from '@/hooks/task'



const Dashboard = () => {
    
    const {tasks, setTasks, assignedTasks, getAllTasks, generateTasks} = useTasks()
    const { user } = useAuth()
    const [status, setStatus] = useState('All')
    const [open, setOpen] = useState(false)
 
    const handleGenerateTask = async() => {
        const generated =  await generateTasks(user.id);
        for(let i = 0; i < generated.length; i++){
            generated[i].assigned_to = user.id
        }
        console.log([...tasks,...generated])
        setTasks([...tasks,...generated]);
    }

    const handleStatus = (status) => {
        setStatus(status)
    }

    const handleCreateModal = () => {
        setOpen(!open)
    }

    if (!user) return null;


    return (
        <div className='mx-auto lg:container px-2 py-10 w-full'>
            <Header title=" Tasks" >
                    <div className='flex  py-0 m-5'>
                        <div className='ml-auto text-right '>
                            <Button variant='default' size='sm' onClick={handleGenerateTask}>
                                <FaPlusCircle className={'mr-2'}/>
                                Generate Tasks
                            </Button>
                            </div>
                            <div className='ml-2'>

                            <Button variant='default' size='sm' onClick={handleCreateModal}>
                                <FaPlusCircle className={'mr-2'}/>
                                Create Task
                            </Button>
                            </div>
                        </div>
            </Header>
           
            <div className="py-12">
                {tasks && (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:flex-row'>
                        <TaskStateCard state='All'/>
                        <TaskStateCard state='in_progress'/>
                        <TaskStateCard state='Pending'/>
                        <TaskStateCard state='Completed'/>
                        <div className='col-span-2 lg:col-span-2'>
                            <TaskStateCard assigned={assignedTasks} state='Assigned'/>
                        </div>
                    </div>
                )}
                <div className={'py-10'}>
                    <TaskFilter cb={handleStatus}/>
                    {!!tasks && (
                        <TaskList type={status}/>
                    )}
                </div>
                <CreateTask open={open} setOpen={handleCreateModal} />
            </div>
        </div>
    )
}

export default Dashboard