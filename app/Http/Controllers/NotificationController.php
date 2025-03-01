<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Mail\ItemDue;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\PostmarkTestMail;


class NotificationController extends Controller
{
    public function processNotification(Request $request)
    {
        $validated = $request->validate($item);
        return new ItemRequestEmail($item);
    }
    public function ItemRequestEmail(Request $request): RedirectResponse
    {
        $item = Item::findOrFail($request->id);
        Mail::to($request->contact_email)->send(new ItemDue($item));

        return redirect('/');
    }


    public function sendTestEmail()
    {
        try {
            $email = new PostmarkTestMail();

            // Setting the recipient
            $email->to('hello@alecsquire.co.uk');

            // Send the email directly
            $result = $email->send(app('mailer'));

            return response()->json([
                'success' => true,
                'message' => 'Email sent successfully',
                'result' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send email: ' . $e->getMessage()
            ], 500);
        }
    }
}
