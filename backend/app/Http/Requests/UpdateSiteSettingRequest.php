<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteSettingRequest extends FormRequest
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
            'phone' => ['nullable', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'instagram' => ['nullable', 'url', 'max:255'],
            'youtube' => ['nullable', 'string', 'max:255'],
            'facebook' => ['nullable', 'url', 'max:255'],
            'executive_director_photo' => ['nullable', 'image', 'max:4096'],
            'executive_director_name' => ['nullable', 'string', 'max:255'],
            'executive_director_position' => ['nullable', 'string', 'max:255'],
            'executive_director_phone' => ['nullable', 'string', 'max:100'],
            'executive_director_email' => ['nullable', 'email', 'max:255'],
            'contact_feedback_title' => ['nullable', 'string', 'max:255'],
            'contact_feedback_description' => ['nullable', 'string'],
            'fund_summary_title' => ['nullable', 'string', 'max:255'],
            'fund_summary' => ['nullable', 'string'],
            'footer_text' => ['nullable', 'string'],
            'fund_logo' => ['nullable', 'image', 'max:4096'],
            'portfolio_section_description' => ['nullable', 'string'],
            'achievement_section_title' => ['nullable', 'string', 'max:255'],
            'achievement_section_description' => ['nullable', 'string'],
            'team_section_title' => ['nullable', 'string', 'max:255'],
            'team_section_description' => ['nullable', 'string'],
            'about_hero_title' => ['nullable', 'string', 'max:255'],
            'about_hero_description' => ['nullable', 'string'],
            'about_history_title' => ['nullable', 'string', 'max:255'],
            'about_history_text' => ['nullable', 'string'],
            'about_process_title' => ['nullable', 'string', 'max:255'],
            'about_process_description' => ['nullable', 'string'],
            'about_documents_title' => ['nullable', 'string', 'max:255'],
            'about_reports_title' => ['nullable', 'string', 'max:255'],
            'news_hero_title' => ['nullable', 'string', 'max:255'],
            'news_hero_description' => ['nullable', 'string'],
            'news_section_title' => ['nullable', 'string', 'max:255'],
            'faq_hero_title' => ['nullable', 'string', 'max:255'],
            'faq_hero_description' => ['nullable', 'string'],
            'faq_section_title' => ['nullable', 'string', 'max:255'],
            'scholarships_hero_title' => ['nullable', 'string', 'max:255'],
            'scholarships_hero_description' => ['nullable', 'string'],
            'scholarships_section_title' => ['nullable', 'string', 'max:255'],
            'scholarships_section_description' => ['nullable', 'string'],
            'hero_title' => ['sometimes', 'required', 'string', 'max:255'],
            'hero_subtitle' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'image', 'max:6144'],
            'hero_cta_primary' => ['nullable', 'string', 'max:100'],
            'statistics' => ['nullable', 'array'],
        ];
    }
}
