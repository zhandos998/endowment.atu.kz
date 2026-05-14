<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreScholarshipRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'conditions' => ['nullable', 'string'],
            'application_steps' => ['nullable', 'string'],
            'required_documents' => ['nullable', 'string'],
            'amount' => ['required', 'numeric', 'min:0'],
            'deadline' => ['nullable', 'date'],
        ];
    }
}
