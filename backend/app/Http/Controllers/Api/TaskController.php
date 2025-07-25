<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * Controller responsável por gerenciar as operações da API de tarefas.
 *
 * Implementa operações CRUD completas seguindo padrões REST:
 * - GET /api/tasks - Lista todas as tarefas
 * - POST /api/tasks - Cria uma nova tarefa
 * - GET /api/tasks/{id} - Exibe uma tarefa específica
 * - PUT /api/tasks/{id} - Atualiza uma tarefa
 * - DELETE /api/tasks/{id} - Remove uma tarefa
 */
class TaskController extends Controller
{
    public function __construct(
        private readonly TaskService $taskService
    ) {}

    /**
     * Retorna a listagem de todas as tarefas ordenadas por data de criação.
     *
     * @return AnonymousResourceCollection Lista de tarefas formatadas via TaskResource
     */
    public function index(): AnonymousResourceCollection
    {
        $tasks = $this->taskService->getAllTasks();

        return TaskResource::collection($tasks);
    }

    /**
     * Armazena uma nova tarefa no banco de dados.
     *
     * @param CreateTaskRequest $request Dados validados da tarefa
     * @return TaskResource Tarefa criada formatada
     */
    public function store(CreateTaskRequest $request): TaskResource
    {
        $task = $this->taskService->createTask($request->validated('title'));

        return new TaskResource($task);
    }

    /**
     * Display the specified task.
     */
    public function show(int $id): TaskResource|JsonResponse
    {
        $task = $this->taskService->getTaskById($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found',
            ], 404);
        }

        return new TaskResource($task);
    }

    /**
     * Update the specified task.
     */
    public function update(UpdateTaskRequest $request, int $id): TaskResource|JsonResponse
    {
        $validated = $request->validated();

        try {
            $task = $this->taskService->updateTask(
                $id,
                $validated['title'] ?? null,
                $validated['completed'] ?? null
            );

            if (!$task) {
                return response()->json([
                    'message' => 'Task not found',
                ], 404);
            }

            return new TaskResource($task);

        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => ['title' => [$e->getMessage()]],
            ], 422);
        }
    }

    /**
     * Remove the specified task.
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->taskService->deleteTask($id);

        if (!$deleted) {
            return response()->json([
                'message' => 'Task not found',
            ], 404);
        }

        return response()->json([
            'message' => 'Task deleted successfully',
        ], 200);
    }

    /**
     * Toggle task completion status.
     */
    public function toggle(int $id): TaskResource|JsonResponse
    {
        $task = $this->taskService->toggleTaskCompletion($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found',
            ], 404);
        }

        return new TaskResource($task);
    }

    /**
     * Get completed tasks.
     */
    public function completed(): AnonymousResourceCollection
    {
        $tasks = $this->taskService->getCompletedTasks();

        return TaskResource::collection($tasks);
    }

    /**
     * Get pending tasks.
     */
    public function pending(): AnonymousResourceCollection
    {
        $tasks = $this->taskService->getPendingTasks();

        return TaskResource::collection($tasks);
    }
}
