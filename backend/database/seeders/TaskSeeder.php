<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'title' => 'Implementar autenticação JWT',
                'completed' => false,
            ],
            [
                'title' => 'Criar sistema de notificações',
                'completed' => false,
            ],
            [
                'title' => 'Refatorar componentes Angular',
                'completed' => true,
            ],
            [
                'title' => 'Configurar CI/CD pipeline',
                'completed' => false,
            ],
            [
                'title' => 'Escrever testes unitários',
                'completed' => true,
            ],
            [
                'title' => 'Implementar cache Redis',
                'completed' => false,
            ],
        ];

        foreach ($tasks as $taskData) {
            Task::create($taskData);
        }
    }
}
