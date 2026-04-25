<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'category',
        'client',
        'technologies',
        'platforms',
        'images',
        'github_url',
        'github_private',
        'demo_url',
        'demo_private',
        'demo_soon',
        'featured',
        'status',
        'year',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'technologies' => 'array',
            'platforms' => 'array',
            'images' => 'array',
            'github_private' => 'boolean',
            'demo_private' => 'boolean',
            'demo_soon' => 'boolean',
            'featured' => 'boolean',
            'year' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    public function trackEvents(): HasMany
    {
        return $this->hasMany(TrackEvent::class);
    }
}
