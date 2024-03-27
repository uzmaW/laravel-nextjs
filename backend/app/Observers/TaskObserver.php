<?php

namespace App\Observers;

use App\Models\Task;

class TaskObserver
{
    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "updated" event.
     */
    public function updated(Task $task): void
    {
        //
        if($task->isDirty('status')){
            $id = $task->getId();
            $status = $task->getStatus();
            if(in_array($status,['completed','cancelled'])) {
                
                $tasks = Task::whereRaw('due_date > NOW()')->orderBy('due_date')->take(2)->get();
                foreach($tasks as $task) {
                    $task->update(['is_locked'=>false,'status' => 'pending']);
                }
            }
        }
    }

    /**
     * Handle the Task "deleted" event.
     */
    public function deleted(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "restored" event.
     */
    public function restored(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "force deleted" event.
     */
    public function forceDeleted(Task $task): void
    {
        //
    }
}
