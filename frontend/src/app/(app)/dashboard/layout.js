import React from "react";
import {TaskProvider} from "@/contexts/taskContext";
import { Toaster } from "@/components/toast/toaster"

const AppLayout = ({ children }) => {
    return (
        <div className="mx-auto">
            {/*<Navigation user={user} />*/}
            <TaskProvider>
                <main>{children}</main>
                <Toaster />
            </TaskProvider>
        </div>
    )
}

export default AppLayout