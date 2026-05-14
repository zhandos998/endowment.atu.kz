<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContactMessageRequest extends FormRequest
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
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:100'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string'],
            'status' => ['nullable', Rule::in(['new', 'in_progress', 'answered', 'closed'])],
            'admin_note' => ['nullable', 'string'],
        ];
    }
}
