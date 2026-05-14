<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'phone',
        'email',
        'address',
        'instagram',
        'youtube',
        'facebook',
        'executive_director_photo',
        'executive_director_name',
        'executive_director_position',
        'executive_director_phone',
        'executive_director_email',
        'contact_feedback_title',
        'contact_feedback_description',
        'fund_summary_title',
        'fund_summary',
        'footer_text',
        'fund_logo',
        'portfolio_section_description',
        'achievement_section_title',
        'achievement_section_description',
        'team_section_title',
        'team_section_description',
        'about_hero_title',
        'about_hero_description',
        'about_history_title',
        'about_history_text',
        'about_process_title',
        'about_process_description',
        'about_documents_title',
        'about_reports_title',
        'news_hero_title',
        'news_hero_description',
        'news_section_title',
        'faq_hero_title',
        'faq_hero_description',
        'faq_section_title',
        'scholarships_hero_title',
        'scholarships_hero_description',
        'scholarships_section_title',
        'scholarships_section_description',
        'hero_title',
        'hero_subtitle',
        'hero_image',
        'hero_cta_primary',
        'statistics',
    ];

    protected function casts(): array
    {
        return [
            'statistics' => 'array',
        ];
    }
}
