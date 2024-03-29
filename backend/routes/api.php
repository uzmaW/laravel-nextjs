<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Task;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([ 'namespace' => 'App\Http\Controllers\Api'], function () {
    Route::apiResource('tasks', 'TaskController')->middleware('auth:sanctum');
    Route::get('users/{id}/tasks', 'UserController@userTasks')->middleware('auth:sanctum');
    Route::post('users/{id}/tasks', 'UserController@createTask')->middleware('auth:sanctum');
    Route::get('users/{id}/assigned', 'UserController@assignedTasks')->middleware('auth:sanctum');
    Route::patch('tasks/{id}/assign', 'TaskController@assignTask')->middleware('auth:sanctum');
    Route::get('tasks/generate/{id}', 'TaskController@automateTaskGenerate')->middleware('auth:sanctum');
});

Route::get('test', function(){
    
    $r = Task::create([
        "title"=> "Hello Conduct Customer Feedback Surveys",
                "description"=> "Gather insights to improve your offerings and nurture leads.",
                "priority"=> "High",
                "due_date"=> "2024-03-10",
                "status"=> "Not Started",
                "category"=> "Lead Nurturing",
                "updated_at"=> "2024-03-29T21:09:56.000000Z",
                "created_at"=> "2024-03-29T21:09:56.000000Z",
                "user_id"=>2
                
    ]);
    dd($r);
    $tasks = Task::whereRaw('due_date > NOW()')
    ->where('status', 'Not Started')
    ->orderBy('due_date')->take(2)->get();
    
    
    $status_to_check = ['completed','cancelled'];
    $wkcount = Task::where('workflow', 1711682888 )->whereIn('status', $status_to_check)->count();

     dd($wkcount);
    $workflow = Task::select('workflow')->max('workflow');
    $workflow++;
    dd($tasks,$workflow);
});