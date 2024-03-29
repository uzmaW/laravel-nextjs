import useZiggyQuery from './useZiggyQuery'; 
import { useState } from 'react'; // Import useState for form handling 
import { useMutation, useQueryClient } from '@tanstack/react-query';

// function TaskComponent() {
//     const { data, isLoading } = useZiggyQuery('tasks.index'); 

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <ul>
//             {data.map((task) => (
//                 <li key={task.id}>{task.title}</li>
//             ))}
//         </ul>
//     );
// }


const Tasks = () => {
  const [currentPage, setCurrentPage] = useState(1);  
  const { data: tasks, isLoading, isFetching, fetchNextPage, isFetchingNextPage } = useZiggyQuery('tasks.index', {
        page: currentPage
    }, 
    {
        enabled: true 
    }
  );

  const [taskTitle, setNewTaskTitle] = useState(''); 
  const [taskDescription, setNewTaskDescription] = useState(''); 
  const [taskDueDate, setNewTaskDueDate] = useState(''); 
  const [taskStatus, setNewTaskStatus] = useState(''); 
  const [taskaskDateCompleted, setNewTaskDateCompleted] = useState(''); 


  useEffect(() => {
    fetchNextPage();
  }, []); // Empty dependency array: Fetch only on component mount
  
  
  const resetTask = () =>{
    setNewTaskTitle(''); // Clear input
    setNewTaskStatus(''); // Clear input
  }

  const updatedTasks = tasks.map((p) => p.id === task.id ? { ...p, ...task } : p); 

   const handleCreateTask = async () => { 
        try {
            const taskData = { 
                title: taskTitle,
                description: taskDescription,
                due_date:taskDueDate,
                status:'new',           
            };
            
            const response = await axios.post(ziggy('tasks.store'), taskData);
            //update task state  
            resetTask();
        } catch (error) {
            // Handle errors appropriately 
        }
    };

    const handleEdit = async(task) => {
        try {
            taskData = {
                    title: taskTitle,
                    description: taskDescription,
                    status: taskStatus
            }
            const response = await axios.post(ziggy('tasks.update'),taskData);
    
            // Update state if successful (e.g., by refetching or adding manually)
            // update task list
            resetTask; // Clear input
        } catch (error) {
            // Handle errors appropriately 
        }
    };


const handleDelete = async (taskId) => {
    const deleteMutation = useMutation(
        () => axios.delete(ziggy('tasks.destroy', { task: taskId })),
        {
            onSuccess: () => {
                const queryClient = useQueryClient(); 
                queryClient.setQueryData('tasks.index', (oldTasks) => {
                    return oldTasks.filter((p) => p.id !== taskId);
                });
            },
        }
    );

    deleteMutation.mutate(); 
};
     

if (isLoading) return <div>Loading...</div>;

  return (
    <div> 
      <h2>Tasks</h2>

      {/* Add New Task */}
      <div>
          <input 
              type="text" 
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)} 
          />
          <button onClick={handleCreateTask}>Add</button>
      </div>

     {/* Tasks Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due date</th>
            <th>Status</th>
            <th>Date completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.due_date}</td>
              <td>{task.status}</td>
              <td>{task.completed_date}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1 || isFetching}
        >
            Previous
        </button>
        <button 
            onClick={() => fetchNextPage()} 
            disabled={!isFetchingNextPage}
        >
            Next
        </button>
     </div>
    </div>
  );
}
export default Tasks;