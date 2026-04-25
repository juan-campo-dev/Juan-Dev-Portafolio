<?php

use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TrackEventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json(['ok' => true]));

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project:slug}', [ProjectController::class, 'show']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::post('/chat', [ChatController::class, 'store'])->middleware('throttle:30,1');
Route::post('/track-event', [TrackEventController::class, 'store'])->middleware('throttle:60,1');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
