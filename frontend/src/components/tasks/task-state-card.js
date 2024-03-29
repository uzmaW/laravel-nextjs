import React from "react";
import {FcTodoList} from "react-icons/fc";
import {FcClock} from "react-icons/fc";
import {useTasks} from '@/contexts/taskContext';
import {FaCalendarDay, FaUserClock, FaUser} from "react-icons/fa";
import {IoMdCheckmarkCircle} from "react-icons/io";
import Link from "next/link";




export default function TaskStateCard({state, assigned}) {
    let modState = state === 'in_progress' ? 'In progress' : state
    const {tasks: allTask} = useTasks()

    const getIcon = () => {
        switch (state) {
            case 'in_progress':
                return <FcTodoList/>
            case 'Scheduled':
                return <FcClock/>
            case 'Completed':
                return <IoMdCheckmarkCircle/>
            case 'Assigned':
                return <FaUser/>
            default:
                return <FaUserClock/>
        }
    }

    return (
            <div className='flex justify-between border w-full px-3 py-5 rounded-2xl shadow shadow-gray-200'>
                <div>
                    {getIcon()}
                    <p className='mt-4'>{modState}</p>
                </div>
                {state === 'All' && (
                    <h2 className='text-3xl font-bold'>
                        {allTask.length}
                    </h2>
                )}

                {state !== 'All' && !assigned && (
                    <h2 className='text-3xl font-bold'>
                        {allTask.filter((task) => task.status === state.toLowerCase()).length}
                    </h2>
                )}

                {state === 'Assigned' && assigned && (
                    <h2 className='text-3xl font-bold'>
                        {assigned?.length}
                    </h2>
                )}
            </div>
    )
}
