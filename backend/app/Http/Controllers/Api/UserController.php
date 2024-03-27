<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


/** *
 * APIs for managing users
 */
class UserController extends Controller
{
    /**
     * Create a new task for the user.
     * @apiResource App\Http\Resources\TaskResource
     * @apiResourceModel App\Models\Task
     * @BodyParam title required The title of the task.
     * @BodyParam description required The description of the task.
     * @BodyParam due_date required The due date of the task.
     * @param StoreTaskRequest $request
     * @param $id
     * @return TaskResource|JsonResponse
     */
    public function createTask(StoreTaskRequest $request, $id): TaskResource|\Illuminate\Http\JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        $task = Task::create($request->validated());
        $task->user_id = $id;
        $task->save();
        return new TaskResource($task);
    }

    /**
     * Show tasks by user.
     *
     * @apiResourceCollection App\Http\Resources\TaskCollection
     * @apiResource
     * @apiResourceModel App\Models\Task
     *
     * @param $id
     * @return TaskCollection|JsonResponse
     */
    public function userTasks($id): TaskCollection|JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }
        return new TaskCollection(Task::where('user_id', $id)
            ->orWhere('assigned_to', $id)
            ->orderBy('updated_at', 'desc')
            ->get());
    }

    /**
     * Show tasks assigned to a user.
     *
     * @apiResourceCollection App\Http\Resources\TaskCollection
     * @apiResource App\Http\Resources\TaskResource
     * @apiResourceModel App\Models\Task
     *
     * @param Request $request
     * @param $id string
     * @return TaskCollection|JsonResponse
     */
    public function assignedTasks(Request $request, string $id): TaskCollection | JsonResponse
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(['error' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }
        return new TaskCollection($user->tasksAssigned);
    }
}
