<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAboutDocumentRequest extends FormRequest
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
        $documentMimes = $this->input('category') === 'statutory' ? 'pdf' : 'pdf,doc,docx';

        return [
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(['statutory', 'financial'])],
            'document' => ['required', 'file', 'mimes:'.$documentMimes, 'max:20480'],
            'published_at' => ['nullable', 'date'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
