<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Ownership is checked by ItemPolicy in the controller
        return true;
    }

    /**
     * Creating an item needs every field. Updating can send just the fields
     * that changed, like the "mark as returned" toggle sending isReturned.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $required = $this->isMethod('post') ? 'required' : 'sometimes';

        return [
            'contact_name' => [$required, 'string', 'max:255'],
            'contact_email' => [$required, 'email', 'max:255'],
            'transaction_type' => [$required, 'in:lending,borrowing'],
            'item_name' => [$required, 'string', 'max:255'],
            'item_description' => ['nullable', 'string', 'max:500'],
            'return_date' => [$required, 'date'],
            'isReturned' => ['sometimes', 'boolean'],
        ];
    }
}
