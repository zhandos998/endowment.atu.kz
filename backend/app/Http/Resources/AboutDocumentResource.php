<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\ResolvesMediaUrls;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AboutDocumentResource extends JsonResource
{
    use ResolvesMediaUrls;

    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category,
            'document_path' => $this->document_path,
            'document_url' => $this->mediaUrl($this->document_path),
            'published_at' => $this->published_at?->toDateString(),
            'sort_order' => $this->sort_order,
            'is_active' => $this->is_active,
        ];
    }
}
