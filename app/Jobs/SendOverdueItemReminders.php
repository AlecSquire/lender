<?php

namespace App\Jobs;

use App\Mail\ItemDue;
use App\Models\Item;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendOverdueItemReminders implements ShouldQueue
{
    use Queueable;

    public function handle(): void
    {
        // lazy() pages through the table instead of loading every overdue item at once
        Item::overdue()->lazy()->each(function (Item $item) {
            Mail::to($item->contact_email)->send(new ItemDue($item));
        });
    }
}
