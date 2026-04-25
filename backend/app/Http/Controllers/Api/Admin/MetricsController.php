<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TrackEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class MetricsController extends Controller
{
    public function index(): JsonResponse
    {
        $topProjects = TrackEvent::query()
            ->select('project_slug', DB::raw('COUNT(*) as views'))
            ->where('type', 'project_view')
            ->whereNotNull('project_slug')
            ->groupBy('project_slug')
            ->orderByDesc('views')
            ->limit(5)
            ->get()
            ->map(function (TrackEvent $event) {
                $project = Project::where('slug', $event->project_slug)->first();

                return [
                    'slug' => $event->project_slug,
                    'title' => $project?->title ?? $event->project_slug,
                    'views' => (int) $event->views,
                ];
            })
            ->values();

        return response()->json([
            'total_visits' => TrackEvent::where('type', 'page_view')->count(),
            'total_project_views' => TrackEvent::where('type', 'project_view')->count(),
            'top_projects' => $topProjects,
        ]);
    }
}