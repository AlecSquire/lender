<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Mail\ItemDue;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class NotificationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $item = Item::findOrFail($request->id);
        Mail::to($request->contact_email)->send(new ItemDue($item));

        return redirect('/');
    }
}
