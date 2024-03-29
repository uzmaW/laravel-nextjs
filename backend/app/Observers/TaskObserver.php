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
        \Log::info('Task Observer triggered!'); 

        if($task->isDirty('status') || $task->wasChanged()){
            $id = $task->getId();
            $status = $task->getOrigional('Status');
            $status_to_check = ['completed','cancelled'];
            
            if($status!== $task->getStatus() && in_array($status, $status_to_check)) {
                $wkcount = Task::where('workflow', $task->workflow)->whereIn('status', $status_to_check)->count();
                
                if($wkcount == 2) {
                    $task->update(['is_locked'=>true]);  
                    $tasks = Task::whereRaw('due_date > NOW()')
                    ->where('status', 'Not Started')
                    ->orderBy('due_date')->take(2)->get();
                    $wk = time();
            
                    foreach($tasks as $task) {
                        $task->update(['is_locked'=>false,'status' => 'pending','workflow'=> $wk]);
                    }
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
