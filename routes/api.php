<?php

use App\Http\Controllers\BorrowerController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LenderController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Route for checking authenticated user
Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});
// All protected API resources
// routes/api.php
Route::middleware(['log.api'])->group(function () {
    Route::resource('items', ItemController::class);
    Route::resource('users', UserController::class);
    Route::apiResource('notify', NotificationController::class);
});
// Keep this test route outside of auth if needed
Route::get('/mailable', function () {
    $item = App\Models\Item::find(3);
    return new App\Mail\ItemDue($item);
});
