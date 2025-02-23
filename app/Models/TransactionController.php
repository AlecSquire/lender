<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /**
     * Get the user that owns the TransactionController
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    // public function transaction(): BelongsTo
    // {
    //     return $this->belongsTo(User::class, 'foreign_key', 'other_key');
    // }
}
