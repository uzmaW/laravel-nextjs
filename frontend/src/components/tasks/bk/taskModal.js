import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react'; 

function TaskModal({ isOpen, setIsOpen, mode, taskToEdit = null }) { // mode: 'add' or 'edit' 

  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === 'add') {
      // Logic to handle adding a new post
    } else if (mode === 'edit') {
      // Logic to handle editing an existing post (use taskToEdit.id)
    }

    // After successful add/edit:
    setTitle('');  
    setIsOpen(false); // Close the modal 
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Title>{mode === 'add' ? 'Add Task' : 'Edit Task'}</Dialog.Title>
      <Dialog.Content>
        <form onSubmit={handleSubmit}>
          <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
          />
          <button type="submit">Save</button>
        </form>
      </Dialog.Content>
      <Dialog.Close onClick={() => setIsOpen(false)}>Cancel</Dialog.Close> {/* Close button */}
    </Dialog.Root>
  );
}