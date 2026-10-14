<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'item_name' => $this->item_name,
            'item_description' => $this->item_description,
            'transaction_type' => $this->transaction_type,
            'contact_name' => $this->contact_name,
            'contact_email' => $this->contact_email,
            'return_date' => $this->return_date?->toDateString(),
            'isReturned' => $this->isReturned,
        ];
    }
}
