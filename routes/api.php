<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());

    Route::apiResource('items', ItemController::class);

    // Send the borrower a reminder now, rather than waiting for the daily run
    Route::post('/notify', [NotificationController::class, 'store'])->name('item.notify');
});
