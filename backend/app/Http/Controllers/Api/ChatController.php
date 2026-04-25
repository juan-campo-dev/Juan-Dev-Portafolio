<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\VertexChatService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Throwable;

class ChatController extends Controller
{
    public function __construct(private readonly VertexChatService $vertexChatService)
    {
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'messages' => ['required', 'array', 'min:1', 'max:20'],
            'messages.*.role' => ['required', 'string', Rule::in(['user', 'assistant'])],
            'messages.*.content' => ['required', 'string', 'max:4000'],
        ]);

        try {
            $reply = $this->vertexChatService->generateReply($data['messages']);

            return response()->json([
                'message' => $reply,
            ]);
        } catch (Throwable $exception) {
            Log::error('Vertex chat request failed', [
                'message' => $exception->getMessage(),
                'exception' => $exception,
            ]);

            return response()->json([
                'error' => config('app.debug')
                    ? $exception->getMessage()
                    : 'Error al enviar el mensaje',
            ], 502);
        }
    }
}