<?php

use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\Admin\CertificateController as AdminCertificateController;
use App\Http\Controllers\Api\Admin\MetricsController as AdminMetricsController;
use App\Http\Controllers\Api\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TrackEventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn() => response()->json(['ok' => true]));

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project:slug}', [ProjectController::class, 'show']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::post('/chat', [ChatController::class, 'store'])->middleware('throttle:30,1');
Route::post('/track-event', [TrackEventController::class, 'store'])->middleware('throttle:60,1');

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login'])->middleware('throttle:10,1');

    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::get('/me', [AdminAuthController::class, 'me']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        Route::get('/metrics', [AdminMetricsController::class, 'index']);

        Route::get('/projects', [AdminProjectController::class, 'index']);
        Route::post('/projects', [AdminProjectController::class, 'store']);
        Route::put('/projects/{project}', [AdminProjectController::class, 'update']);
        Route::delete('/projects/{project}', [AdminProjectController::class, 'destroy']);

        Route::get('/certificates', [AdminCertificateController::class, 'index']);
        Route::post('/certificates', [AdminCertificateController::class, 'store']);
        Route::put('/certificates/{certificate}', [AdminCertificateController::class, 'update']);
        Route::delete('/certificates/{certificate}', [AdminCertificateController::class, 'destroy']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
