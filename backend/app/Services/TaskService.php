<?php

namespace App\Services;

use App\DTOs\CreateTaskDTO;
use App\DTOs\UpdateTaskDTO;
use App\Models\Task;
use App\Repositories\Contracts\TaskRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    public function __construct(
        private readonly TaskRepositoryInterface $taskRepository
    ) {}

    /**
     * Get all tasks.
     */
    public function getAllTasks(): Collection
    {
        return $this->taskRepository->getAll();
    }

    /**
     * Get a task by ID.
     */
    public function getTaskById(int $id): ?Task
    {
        return $this->taskRepository->findById($id);
    }

    /**
     * Create a new task.
     */
    public function createTask(string $title): Task
    {
        $title = trim($title);
        
        if (empty($title)) {
            throw new \InvalidArgumentException('Task title cannot be empty');
        }

        $dto = new CreateTaskDTO($title);
        return $this->taskRepository->create($dto);
    }

    /**
     * Update a task.
     */
    public function updateTask(int $id, ?string $title = null, ?bool $completed = null): ?Task
    {
        $task = $this->taskRepository->findById($id);
        
        if (!$task) {
            return null;
        }

        // Validate title if provided
        if ($title !== null) {
            $title = trim($title);
            if (empty($title)) {
                throw new \InvalidArgumentException('Task title cannot be empty');
            }
        }

        $dto = new UpdateTaskDTO($title, $completed);
        return $this->taskRepository->update($id, $dto);
    }

    /**
     * Toggle task completion status.
     */
    public function toggleTaskCompletion(int $id): ?Task
    {
        $task = $this->taskRepository->findById($id);
        
        if (!$task) {
            return null;
        }

        return $this->updateTask($id, null, !$task->completed);
    }

    /**
     * Delete a task.
     */
    public function deleteTask(int $id): bool
    {
        return $this->taskRepository->delete($id);
    }

    /**
     * Get completed tasks.
     */
    public function getCompletedTasks(): Collection
    {
        return $this->taskRepository->getCompleted();
    }

    /**
     * Get pending tasks.
     */
    public function getPendingTasks(): Collection
    {
        return $this->taskRepository->getPending();
    }
}
