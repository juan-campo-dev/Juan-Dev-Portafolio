<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'projects' => Project::query()
                ->orderBy('sort_order')
                ->orderByDesc('updated_at')
                ->get()
                ->map(fn(Project $project) => $this->serialize($project))
                ->values(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $this->normalizeRequest($request);

        $data = $request->validate($this->rules());
        $data = $this->applyUpload($request, $data);

        $project = Project::create($data);

        return response()->json(['project' => $this->serialize($project)], 201);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $this->normalizeRequest($request, $project);

        $data = $request->validate($this->rules($project));
        $data = $this->applyUpload($request, $data, $project);

        $project->update($data);

        return response()->json(['project' => $this->serialize($project->fresh())]);
    }

    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json(['ok' => true]);
    }

    private function rules(?Project $project = null): array
    {
        $projectId = $project?->id;

        return [
            'slug' => ['required', 'string', 'max:140', Rule::unique('projects', 'slug')->ignore($projectId)],
            'title' => ['required', 'string', 'max:180'],
            'description' => ['required', 'string', 'max:5000'],
            'category' => ['required', 'string', 'max:120'],
            'client' => ['nullable', 'string', 'max:180'],
            'technologies' => ['required', 'array', 'min:1'],
            'technologies.*' => ['string', 'max:80'],
            'platforms' => ['nullable', 'array'],
            'platforms.*' => ['string', 'max:80'],
            'images' => ['nullable', 'array'],
            'images.*' => ['string', 'max:500'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'github_url' => ['nullable', 'url', 'max:500'],
            'github_private' => ['nullable', 'boolean'],
            'demo_url' => ['nullable', 'url', 'max:500'],
            'demo_private' => ['nullable', 'boolean'],
            'demo_soon' => ['nullable', 'boolean'],
            'featured' => ['nullable', 'boolean'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
            'year' => ['nullable', 'integer', 'min:2000', 'max:2100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    private function normalizeRequest(Request $request, ?Project $project = null): void
    {
        if (!$request->filled('slug') && $request->filled('title')) {
            $request->merge(['slug' => Str::slug((string) $request->input('title'))]);
        }

        foreach (['technologies', 'platforms', 'images'] as $field) {
            $value = $request->input($field);

            if (is_string($value)) {
                $decoded = json_decode($value, true);
                $request->merge([
                    $field => is_array($decoded)
                        ? $decoded
                        : array_values(array_filter(array_map('trim', explode(',', $value)))),
                ]);
            }
        }

        $defaults = [
            'category' => $project?->category ?? 'Web',
            'technologies' => $project?->technologies ?? ['React'],
            'platforms' => $project?->platforms ?? [],
            'status' => $project?->status ?? 'published',
            'sort_order' => $project?->sort_order ?? 0,
        ];

        foreach ($defaults as $field => $value) {
            if (!$request->has($field)) {
                $request->merge([$field => $value]);
            }
        }
    }

    private function applyUpload(Request $request, array $data, ?Project $project = null): array
    {
        foreach (['github_private', 'demo_private', 'demo_soon', 'featured'] as $field) {
            $data[$field] = $request->boolean($field);
        }

        if ($request->hasFile('image_file')) {
            $data['images'] = [$this->storePublicUpload($request, 'projects')];
        } elseif (empty($data['images']) && $project) {
            $data['images'] = $project->images ?? [];
        }

        return $data;
    }

    private function storePublicUpload(Request $request, string $folder): string
    {
        $file = $request->file('image_file');
        $directory = public_path("uploads/{$folder}");

        File::ensureDirectoryExists($directory, 0755, true);

        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $file->move($directory, $filename);

        return url("uploads/{$folder}/{$filename}");
    }

    private function serialize(Project $project): array
    {
        return [
            'id' => $project->id,
            'slug' => $project->slug,
            'title' => $project->title,
            'description' => $project->description,
            'category' => $project->category,
            'client' => $project->client,
            'technologies' => $project->technologies ?? [],
            'platforms' => $project->platforms ?? [],
            'images' => $project->images ?? [],
            'github_url' => $project->github_url,
            'github_private' => (bool) $project->github_private,
            'demo_url' => $project->demo_url,
            'demo_private' => (bool) $project->demo_private,
            'demo_soon' => (bool) $project->demo_soon,
            'featured' => (bool) $project->featured,
            'status' => $project->status,
            'year' => $project->year,
            'sort_order' => $project->sort_order,
            'updated_at' => $project->updated_at?->toISOString(),
        ];
    }
}