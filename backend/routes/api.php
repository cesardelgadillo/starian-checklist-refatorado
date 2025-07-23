<?php

use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;

// Task routes
Route::prefix('tasks')->name('tasks.')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('index');
    Route::post('/', [TaskController::class, 'store'])->name('store');
    Route::get('/completed', [TaskController::class, 'completed'])->name('completed');
    Route::get('/pending', [TaskController::class, 'pending'])->name('pending');
    Route::get('/{id}', [TaskController::class, 'show'])->name('show');
    Route::put('/{id}', [TaskController::class, 'update'])->name('update');
    Route::patch('/{id}', [TaskController::class, 'update'])->name('patch');
    Route::delete('/{id}', [TaskController::class, 'destroy'])->name('destroy');
    Route::patch('/{id}/toggle', [TaskController::class, 'toggle'])->name('toggle');
});

// Legacy routes for backward compatibility (will be deprecated)
Route::get('/tarefas', [TaskController::class, 'index'])->name('legacy.tasks.index');
Route::post('/tarefas', [TaskController::class, 'store'])->name('legacy.tasks.store');
Route::delete('/tarefas/{id}', [TaskController::class, 'destroy'])->name('legacy.tasks.destroy');

// API health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'timestamp' => now()->toISOString(),
        'service' => 'Task API',
        'version' => '1.0.0',
    ]);
})->name('health');
