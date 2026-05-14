<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FundPortfolio extends Model
{
    protected $fillable = [
        'title',
        'direction',
        'description',
        'icon',
        'color',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
