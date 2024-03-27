<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([ 'namespace' => 'App\Http\Controllers\Api\v1'], function () {
    Route::apiResource('tasks', 'TaskController')->middleware('auth:sanctum');
    Route::get('users/{id}/tasks', 'UserController@listTasks')->middleware('auth:sanctum');
    Route::post('users/{id}/tasks', 'UserController@createTask')->middleware('auth:sanctum');
    Route::get('users/{id}/assigned', 'UserController@assignedTasks')->middleware('auth:sanctum');
    Route::patch('tasks/{id}/assign', 'TaskController@assignTask')->middleware('auth:sanctum');
    Route::get('tasks/generate', 'TaskController@automateTaskGenerate')->middleware('auth:sanctum');
});
