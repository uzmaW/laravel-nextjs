<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Services\TaskGeneratorService;
use App\Models\Task;
use App\Models\User;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;


/**
 * @group Task management
 *
 * APIs for managing tasks
 *
 */
class TaskController extends Controller
{
    /**
     * Display a all tasks.
     *
     * @apiResourceCollection App\Http\Resources\TaskCollection
     * @apiResourceModel App\Models\Task
     * @return TaskCollection
     */
    public function index(): TaskCollection
    {
        return new TaskCollection(Task::paginate(20));
    }

    /**
     * Store a newly created task.
     * @apiResource App\Http\Resources\TaskResource
     * @apiResourceModel App\Models\Task
     * @BodyParam title required The title of the task.
     * @BodyParam description required The description of the task.
     * @BodyParam due_date required The due date of the task.
     * @param StoreTaskRequest $request
     * @return TaskResource
     *
     */
    public function store(StoreTaskRequest $request): TaskResource|JsonResponse
    {   
        //DB::beginTransaction();
        
        try {
            $task = Task::create($request->validated());
            //$task->users()->attach($request->user()->id);
          //  DB::commit();
        
            return new TaskResource($task);        
        } catch (Exception $e) {
            //DB::rollBack();

            return response()->json(['error' => 'Failed to create task.'], $e->getMessage());
        }
        
    }

    public function show($id): TaskResource|JsonResponse
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found.'], Response::HTTP_NOT_FOUND);
        }

        return new TaskResource($task);
    }


    /**
     * Update a specific task.
     * @apiResource App\Http\Resources\TaskResource
     * @apiResourceModel App\Models\Task
     * @UrlParam $id string required The ID of the task.
     * @BodyParam title optional The title of the task.
     * @BodyParam description optional The description of the task.
     * @BodyParam due_date optional The due date of the task.
     * @BodyParam status optional The status of the task.
     * @BodyParam priority optional The priority of the task.
     * @param UpdateTaskRequest $request
     * @param Task $task
     * @return TaskResource
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return new TaskResource($task);
    }

    /**
     * Remove a task.
     *
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        //
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['error' => 'Task not found.'], Response::HTTP_NOT_FOUND);
        }

        $task->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Assign a task to a user.
     *
     * @apiResource App\Http\Resources\TaskResource
     * @apiResourceModel App\Models\Task
     * @UrlParam $id string required The ID of the task.
     * @BodyParam email string required The email of the user to assign the task to.
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function assignTask(Request $request, $id): JsonResponse
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['error' => 'Task not found.'], Response::HTTP_NOT_FOUND);
        }

        $user = User::where('email', $request->input('email'))->first();
        if (!$user) {
            return response()->json(['error' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }

        $task->assigned_to = $user->id;
        $task->assigned_by = $request->user()->id;
        $task->save();

        return response()->json([
            'message' => 'Task assigned successfully to ' . $user->name,
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * @param $id
     * @param TaskGeneratorService $taskGeneratorService
     * @return JsonResponse
     */
    public function automateTaskGenerate(int $id,TaskGeneratorService $taskGeneratorService)
    {   
        $id_verified = false;
        
        if($id) 
        {
            $user = User::find($id);
            $id_verified = $user ? $user->id : false;
        }
        
        $t =$taskGeneratorService->generate($id_verified);

        $msg = is_array($t) ?['success' => 'tasks generated successfully.'
        ,'data'=>['tasks'=>$t]]
        :['error' => 'error occurred while generating tasks.'];
     
        return response()->json($msg);
    }

}
