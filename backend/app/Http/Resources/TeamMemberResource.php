<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\ResolvesMediaUrls;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamMemberResource extends JsonResource
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
            'name' => $this->name,
            'role' => $this->role,
            'photo' => $this->photo,
            'photo_url' => $this->mediaUrl($this->photo),
            'regalia' => $this->regalia,
            'category' => $this->category,
            'sort_order' => $this->sort_order,
            'is_active' => $this->is_active,
        ];
    }
}
