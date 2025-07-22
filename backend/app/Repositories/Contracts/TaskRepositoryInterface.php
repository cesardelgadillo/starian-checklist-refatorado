<?php

namespace App\Repositories\Contracts;

use App\DTOs\CreateTaskDTO;
use App\DTOs\UpdateTaskDTO;
use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

interface TaskRepositoryInterface
{
    /**
     * Get all tasks.
     */
    public function getAll(): Collection;

    /**
     * Find a task by ID.
     */
    public function findById(int $id): ?Task;

    /**
     * Create a new task.
     */
    public function create(CreateTaskDTO $dto): Task;

    /**
     * Update a task.
     */
    public function update(int $id, UpdateTaskDTO $dto): ?Task;

    /**
     * Delete a task.
     */
    public function delete(int $id): bool;

    /**
     * Get completed tasks.
     */
    public function getCompleted(): Collection;

    /**
     * Get pending tasks.
     */
    public function getPending(): Collection;
}
