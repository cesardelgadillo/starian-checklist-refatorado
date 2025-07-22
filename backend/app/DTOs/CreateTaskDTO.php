<?php

namespace App\DTOs;

readonly class CreateTaskDTO
{
    public function __construct(
        public string $title,
        public bool $completed = false
    ) {}

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'completed' => $this->completed,
        ];
    }
}
