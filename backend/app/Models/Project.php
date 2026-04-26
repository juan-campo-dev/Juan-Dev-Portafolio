<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string|null $description
 * @property string|null $category
 * @property string|null $client
 * @property array|null $technologies
 * @property array|null $platforms
 * @property array|null $images
 * @property string|null $github_url
 * @property bool $github_private
 * @property string|null $demo_url
 * @property bool $demo_private
 * @property bool $demo_soon
 * @property bool $featured
 * @property string $status
 * @property string|null $year
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
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
