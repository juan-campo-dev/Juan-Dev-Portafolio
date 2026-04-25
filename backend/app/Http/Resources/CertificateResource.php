<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'issuer' => $this->issuer,
            'date' => $this->issued_label,
            'category' => $this->category,
            'highlight' => $this->highlight,
            'image' => $this->image,
            'link' => $this->credential_url,
        ];
    }
}
