<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $projects = Project::query()
            ->where('status', 'published')
            ->orderBy('sort_order')
            ->orderByDesc('featured')
            ->orderByDesc('year')
            ->get();

        return ProjectResource::collection($projects);
    }

    public function show(Project $project): ProjectResource
    {
        abort_unless($project->status === 'published', 404, 'Project not found.');

        return new ProjectResource($project);
    }
}
