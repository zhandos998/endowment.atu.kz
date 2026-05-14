<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DonationDetail extends Model
{
    protected $fillable = [
        'qr_image',
        'bank_name',
        'beneficiary',
        'bin',
        'iban',
        'bik',
        'kbe',
        'payment_purpose',
        'donation_cta_title',
        'public_offer_title',
        'public_offer_url',
        'public_offer_document',
        'public_offer_text',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
