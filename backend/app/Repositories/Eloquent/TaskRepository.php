<?php

namespace App\Repositories\Eloquent;

use App\DTOs\CreateTaskDTO;
use App\DTOs\UpdateTaskDTO;
use App\Models\Task;
use App\Repositories\Contracts\TaskRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository implements TaskRepositoryInterface
{
    public function __construct(
        private readonly Task $model
    ) {}

    public function getAll(): Collection
    {
        return $this->model->orderBy('created_at', 'desc')->get();
    }

    public function findById(int $id): ?Task
    {
        return $this->model->find($id);
    }

    public function create(CreateTaskDTO $dto): Task
    {
        return $this->model->create($dto->toArray());
    }

    public function update(int $id, UpdateTaskDTO $dto): ?Task
    {
        $task = $this->findById($id);
        
        if (!$task) {
            return null;
        }

        if ($dto->hasData()) {
            $task->update($dto->toArray());
            $task->refresh();
        }

        return $task;
    }

    public function delete(int $id): bool
    {
        $task = $this->findById($id);
        
        if (!$task) {
            return false;
        }

        return $task->delete();
    }

    public function getCompleted(): Collection
    {
        return $this->model->completed()->orderBy('created_at', 'desc')->get();
    }

    public function getPending(): Collection
    {
        return $this->model->pending()->orderBy('created_at', 'desc')->get();
    }
}
