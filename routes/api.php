<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Route for checking authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});
// All protected API resources

Route::resource('items', ItemController::class)->parameters([
    'items' => 'id'
]);
Route::resource('users', UserController::class);
Route::apiResource('notify', NotificationController::class);

Route::get('/mailable', function ($request) {
    $item = App\Models\Item::find($request->id);
    return new App\Mail\ItemDue($item);
});

Route::get('/send-postmark', [NotificationController::class, 'index']);
Route::get('/send-test-email', [NotificationController::class, 'sendTestEmail']);
Route::get('/item-email/{id}', [NotificationController::class, 'ItemRequestEmail']);
Route::post('/process-notification', [NotificationController::class, 'processNotification']);
