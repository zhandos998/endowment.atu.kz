<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'phone',
        'email',
        'address',
        'instagram',
        'youtube',
        'facebook',
        'hero_title',
        'hero_subtitle',
        'hero_image',
        'hero_cta_primary',
        'hero_cta_secondary',
        'statistics',
    ];

    protected function casts(): array
    {
        return [
            'statistics' => 'array',
        ];
    }
}
