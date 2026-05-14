<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScholarshipApplication extends Model
{
    protected $fillable = [
        'scholarship_id',
        'applicant_name',
        'email',
        'phone',
        'student_group',
        'message',
        'documents',
        'status',
        'admin_note',
    ];

    protected function casts(): array
    {
        return [
            'documents' => 'array',
        ];
    }

    public function scholarship(): BelongsTo
    {
        return $this->belongsTo(Scholarship::class);
    }
}
