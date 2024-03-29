import React from "react";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";

export default function TaskFilter({cb}) {
    const [status, setStatus] = React.useState('All tasks')
    const handleSwitch = (status) => {
        switch (status) {
            case 'all':
                setStatus('All tasks')
                break
            case 'pending':
                setStatus('Pending')
                break
            case 'in_progress':
                setStatus('Ongoing')
                break
            case 'completed':
                setStatus('Completed')
                break
            case 'assigned':
                setStatus('Assigned')
                break
        }
        cb(status)
    }
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>{status}</NavigationMenuTrigger>
                    <NavigationMenuContent className=''>
                        <NavigationMenuLink asChild>
                            <Button variant={'link'} onClick={() => handleSwitch('all')}>All tasks</Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Button variant={'link'} onClick={() => handleSwitch('pending')}>Pending</Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Button variant={'link'} onClick={() => handleSwitch('in_progress')}>Ongoing</Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Button variant={'link'} onClick={() => handleSwitch('completed')}>Completed</Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Button variant={'link'} onClick={() => handleSwitch('assigned')}>Assigned</Button>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}