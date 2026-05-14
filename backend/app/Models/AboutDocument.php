<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutDocument extends Model
{
    protected $fillable = [
        'title',
        'category',
        'document_path',
        'published_at',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'date',
            'is_active' => 'boolean',
        ];
    }
}
