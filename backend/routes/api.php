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