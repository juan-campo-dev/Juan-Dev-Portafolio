<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $technologies = $this->technologies ?? [];

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'images' => $this->images ?? [],
            'technologies' => $technologies,
            'techs' => $technologies,
            'githubUrl' => $this->github_url,
            'githubPrivate' => (bool) $this->github_private,
            'demoUrl' => $this->demo_url,
            'demoPrivate' => (bool) $this->demo_private,
            'demoSoon' => (bool) $this->demo_soon,
            'category' => $this->category,
            'client' => $this->client,
            'platforms' => $this->platforms ?? [],
            'year' => $this->year,
            'featured' => (bool) $this->featured,
        ];
    }
}
