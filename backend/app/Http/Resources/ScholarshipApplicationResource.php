<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\ResolvesMediaUrls;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipApplicationResource extends JsonResource
{
    use ResolvesMediaUrls;

    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $documents = collect($this->documents ?? [])
            ->map(fn ($document) => [
                'name' => $document['name'] ?? 'Документ',
                'url' => $this->mediaUrl($document['path'] ?? null),
                'mime' => $document['mime'] ?? null,
                'size' => $document['size'] ?? null,
            ])
            ->values()
            ->all();

        return [
            'id' => $this->id,
            'scholarship_id' => $this->scholarship_id,
            'scholarship_title' => $this->scholarship?->title,
            'applicant_name' => $this->applicant_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'student_group' => $this->student_group,
            'message' => $this->message,
            'documents' => $documents,
            'status' => $this->status,
            'admin_note' => $this->admin_note,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
