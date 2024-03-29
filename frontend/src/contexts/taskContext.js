"use client";

import React, {
    createContext,
    useContext, useEffect,
    useMemo,
    useState,
} from 'react';

import useSWR, { mutate } from "swr";
import { useTask} from "@/hooks/task";
import { useAuth} from "@/hooks/auth";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [assignedTasks, setAssignedTasks] = useState([]);

    const { user } = useAuth({ middleware: 'auth' })
    const { fetchTasks, fetchAssignedTasks, getAllTasks, generateTasks } = useTask()
    const { data, error } = useSWR(user?.id ? 'allTasks' : null, fetchTasks)
    const { data: assigned } = useSWR(user?.id ? 'assignedTasks' : null, fetchAssignedTasks)
    const refetchTasks = () => {
        mutate('allTasks')
        mutate('assignedTasks')
    }

    useEffect(() => {
        if (data) {
            setTasks(data)
        }

        if (assigned) {
            setAssignedTasks(assigned)
        }
    }, [data, assigned])

    const contextValue = useMemo(() => ({ tasks, setTasks, assignedTasks, setAssignedTasks, getAllTasks, generateTasks, refetchTasks }), [tasks, setTasks, assignedTasks, setAssignedTasks, getAllTasks, generateTasks])

    return (
      <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
    );
  }

  export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
      throw new Error('useTasks must be within a valid provider');
    }
    return context;
  };