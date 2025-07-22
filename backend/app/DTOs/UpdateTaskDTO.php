<?php

namespace App\DTOs;

readonly class UpdateTaskDTO
{
    public function __construct(
        public ?string $title = null,
        public ?bool $completed = null
    ) {}

    public function toArray(): array
    {
        $data = [];
        
        if ($this->title !== null) {
            $data['title'] = $this->title;
        }
        
        if ($this->completed !== null) {
            $data['completed'] = $this->completed;
        }
        
        return $data;
    }

    public function hasData(): bool
    {
        return $this->title !== null || $this->completed !== null;
    }
}
