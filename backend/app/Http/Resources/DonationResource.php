<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonationResource extends JsonResource
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
            'donor_name' => $this->donor_name,
            'amount' => (float) $this->amount,
            'message' => $this->message,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
