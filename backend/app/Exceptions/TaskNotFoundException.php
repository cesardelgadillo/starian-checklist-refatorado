<?php

namespace App\Exceptions;

use Exception;

class TaskNotFoundException extends Exception
{
    protected $message = 'Task not found';
    protected $code = 404;

    public function __construct(int $taskId)
    {
        $this->message = "Task with ID {$taskId} not found";
        parent::__construct($this->message, $this->code);
    }
}
