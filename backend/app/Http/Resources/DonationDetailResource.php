<?php

namespace App\Http\Resources;

use App\Http\Resources\Concerns\ResolvesMediaUrls;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonationDetailResource extends JsonResource
{
    use ResolvesMediaUrls;

    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'qr_image' => $this->qr_image,
            'qr_image_url' => $this->mediaUrl($this->qr_image),
            'bank_name' => $this->bank_name,
            'beneficiary' => $this->beneficiary,
            'bin' => $this->bin,
            'iban' => $this->iban,
            'bik' => $this->bik,
            'kbe' => $this->kbe,
            'payment_purpose' => $this->payment_purpose,
            'donation_cta_title' => $this->donation_cta_title,
            'public_offer_title' => $this->public_offer_title,
            'public_offer_url' => $this->public_offer_url,
            'public_offer_document' => $this->public_offer_document,
            'public_offer_document_url' => $this->mediaUrl($this->public_offer_document),
            'public_offer_text' => $this->public_offer_text,
            'is_active' => $this->is_active,
        ];
    }
}
