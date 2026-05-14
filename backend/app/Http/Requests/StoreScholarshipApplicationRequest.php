<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreScholarshipApplicationRequest extends FormRequest
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
            'scholarship_id' => ['required', 'exists:scholarships,id'],
            'applicant_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:100'],
            'student_group' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string'],
            'documents' => ['nullable', 'array', 'max:8'],
            'documents.*' => ['file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:10240'],
        ];
    }
}
