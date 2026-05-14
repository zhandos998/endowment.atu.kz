<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreDonationDetailRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'qr_image' => ['nullable', 'image', 'max:4096'],
            'bank_name' => ['nullable', 'string', 'max:255'],
            'beneficiary' => ['required', 'string', 'max:255'],
            'bin' => ['nullable', 'string', 'max:32'],
            'iban' => ['nullable', 'string', 'max:64'],
            'bik' => ['nullable', 'string', 'max:32'],
            'kbe' => ['nullable', 'string', 'max:16'],
            'payment_purpose' => ['nullable', 'string'],
            'donation_cta_title' => ['nullable', 'string', 'max:255'],
            'public_offer_title' => ['nullable', 'string', 'max:255'],
            'public_offer_url' => ['nullable', 'string', 'max:255'],
            'public_offer_document' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
            'public_offer_text' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
