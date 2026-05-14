<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFundAchievementRequest extends FormRequest
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
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'value' => ['sometimes', 'required', 'numeric', 'min:0'],
            'unit' => ['nullable', 'string', 'max:40'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:80'],
            'color' => ['nullable', 'string', 'max:32'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
