<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'conditions' => $this->conditions,
            'application_steps' => $this->application_steps,
            'required_documents' => $this->required_documents,
            'amount' => (float) $this->amount,
            'deadline' => $this->deadline?->toDateString(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
