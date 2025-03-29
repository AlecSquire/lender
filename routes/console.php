<?php

use App\Mail\ItemDue;
use App\Models\Item;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    $dueItem = Item::where('is_returned', false)
        ->where('return_date' < Carbon::now());
    Mail::to($dueItem->contact_email)->send(new ItemDue($dueItem));
})->hourly();
