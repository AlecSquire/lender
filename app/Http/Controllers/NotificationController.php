<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Mail\ItemDue;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\PostmarkTestMail;
use App\Traits\ApiResponses;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    use ApiResponses;

    public function store(Request $request)
    {
        $request->validate([
            'id' => 'integer'
        ]);

        $item = Item::findOrFail($request->input('id'));

        Mail::to($item->contact_email)->send(new ItemDue($item));

        return response()->json([
            'message' => 'Notification sent successfully',
            'status' => 'success'
        ]);
    }
}
