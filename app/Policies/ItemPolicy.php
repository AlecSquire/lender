<?php

namespace App\Policies;

use App\Models\Item;
use App\Models\User;

class ItemPolicy
{
    // Items are private to the person who logged them, so every action
    // comes down to the same ownership check.

    public function view(User $user, Item $item): bool
    {
        return $user->id === $item->user_id;
    }

    public function update(User $user, Item $item): bool
    {
        return $user->id === $item->user_id;
    }

    public function delete(User $user, Item $item): bool
    {
        return $user->id === $item->user_id;
    }
}
