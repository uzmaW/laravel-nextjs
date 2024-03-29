import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react'; // For managing dialog state

function Modal({mode, title, content, toBeOpened}) {
    const [isOpen, setIsOpen] = useState(toBeOpened);

    return (
        <div>
            
            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                     {
                     /* Your dialog content here */
                       content
                     }
                </Dialog.Content>
                <Dialog.Close>Close</Dialog.Close>
            </Dialog.Root>
        </div>
    );
}