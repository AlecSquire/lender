<?php

namespace App\Http\Controllers;

use App\Mail\ItemDue;
use App\Mail\ItemReturned;
use App\Models\Item;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\View\View;

class NotificationController extends Controller
{
    use ApiResponses;

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id' => ['required', 'integer'],
        ]);

        $item = Item::findOrFail($validated['id']);

        Gate::authorize('update', $item);

        Mail::to($item->contact_email)->send(new ItemDue($item));

        return $this->ok('Reminder sent');
    }

    public function markAsReturned(Item $item): View
    {
        // Clicking the link twice shouldn't email the owner twice
        if (! $item->isReturned) {
            $item->update(['isReturned' => true]);

            Mail::to($item->user->email)->send(new ItemReturned($item, $item->user));
        }

        return view('item-returned', ['item' => $item]);
    }
}
