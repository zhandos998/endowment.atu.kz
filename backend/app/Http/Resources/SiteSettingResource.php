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
            'hero_title' => $this->hero_title,
            'hero_subtitle' => $this->hero_subtitle,
            'hero_image' => $this->hero_image,
            'hero_image_url' => $this->mediaUrl($this->hero_image),
            'hero_cta_primary' => $this->hero_cta_primary,
            'hero_cta_secondary' => $this->hero_cta_secondary,
            'statistics' => $this->statistics ?? [],
        ];
    }
}
