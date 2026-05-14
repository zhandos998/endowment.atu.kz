<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\ResolvesMediaUrls;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiteSettingResource extends JsonResource
{
    use ResolvesMediaUrls;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'instagram' => $this->instagram,
            'youtube' => $this->youtube,
            'facebook' => $this->facebook,
            'executive_director_photo' => $this->executive_director_photo,
            'executive_director_photo_url' => $this->mediaUrl($this->executive_director_photo),
            'executive_director_name' => $this->executive_director_name,
            'executive_director_position' => $this->executive_director_position,
            'executive_director_phone' => $this->executive_director_phone,
            'executive_director_email' => $this->executive_director_email,
            'contact_feedback_title' => $this->contact_feedback_title,
            'contact_feedback_description' => $this->contact_feedback_description,
            'fund_summary_title' => $this->fund_summary_title,
            'fund_summary' => $this->fund_summary,
            'footer_text' => $this->footer_text,
            'fund_logo' => $this->fund_logo,
            'fund_logo_url' => $this->mediaUrl($this->fund_logo),
            'portfolio_section_description' => $this->portfolio_section_description,
            'achievement_section_title' => $this->achievement_section_title,
            'achievement_section_description' => $this->achievement_section_description,
            'team_section_title' => $this->team_section_title,
            'team_section_description' => $this->team_section_description,
            'about_hero_title' => $this->about_hero_title,
            'about_hero_description' => $this->about_hero_description,
            'about_history_title' => $this->about_history_title,
            'about_history_text' => $this->about_history_text,
            'about_process_title' => $this->about_process_title,
            'about_process_description' => $this->about_process_description,
            'about_documents_title' => $this->about_documents_title,
            'about_reports_title' => $this->about_reports_title,
            'news_hero_title' => $this->news_hero_title,
            'news_hero_description' => $this->news_hero_description,
            'news_section_title' => $this->news_section_title,
            'faq_hero_title' => $this->faq_hero_title,
            'faq_hero_description' => $this->faq_hero_description,
            'faq_section_title' => $this->faq_section_title,
            'scholarships_hero_title' => $this->scholarships_hero_title,
            'scholarships_hero_description' => $this->scholarships_hero_description,
            'scholarships_section_title' => $this->scholarships_section_title,
            'scholarships_section_description' => $this->scholarships_section_description,
            'hero_title' => $this->hero_title,
            'hero_subtitle' => $this->hero_subtitle,
            'hero_image' => $this->hero_image,
            'hero_image_url' => $this->mediaUrl($this->hero_image),
            'hero_cta_primary' => $this->hero_cta_primary,
            'statistics' => $this->statistics ?? [],
        ];
    }
}
