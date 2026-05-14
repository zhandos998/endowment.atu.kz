<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FundAchievement extends Model
{
    protected $fillable = [
        'title',
        'value',
        'unit',
        'description',
        'icon',
        'color',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'value' => 'float',
            'is_active' => 'boolean',
        ];
    }
}
