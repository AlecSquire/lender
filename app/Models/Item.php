<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;

    /**
     * user_id is deliberately not fillable. Items are always created through
     * $user->items()->create(), so nobody can post an item onto someone else.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'contact_name',
        'contact_email',
        'transaction_type',
        'item_name',
        'item_description',
        'return_date',
        'isReturned',
    ];

    // Matches the column default, so a freshly created item isn't sent back as null
    protected $attributes = [
        'isReturned' => false,
    ];

    protected function casts(): array
    {
        return [
            'return_date' => 'date',
            'isReturned' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeOverdue(Builder $query): void
    {
        $query->where('isReturned', false)
            ->whereDate('return_date', '<', today());
    }
}
