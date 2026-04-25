<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TrackEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TrackEventController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'type' => [
                'required',
                'string',
                Rule::in([
                    'page_view',
                    'project_view',
                    'click_github',
                    'click_demo',
                    'contact_click',
                ]),
            ],
            'project_id' => ['nullable', 'integer', 'exists:projects,id'],
            'project_slug' => ['nullable', 'string', 'max:120'],
            'path' => ['nullable', 'string', 'max:255'],
            'referrer' => ['nullable', 'string', 'max:500'],
            'user_agent' => ['nullable', 'string', 'max:500'],
        ]);

        $projectId = $data['project_id'] ?? null;
        if (! $projectId && ! empty($data['project_slug'])) {
            $projectId = Project::where('slug', $data['project_slug'])->value('id');
        }

        TrackEvent::create([
            'type' => $data['type'],
            'project_id' => $projectId,
            'project_slug' => $data['project_slug'] ?? null,
            'payload' => [
                'path' => $data['path'] ?? null,
                'referrer' => $data['referrer'] ?? null,
                'user_agent' => $data['user_agent'] ?? null,
            ],
        ]);

        return response()->json(['ok' => true], 202);
    }
}
