<?php

use App\Http\Controllers\BorrowerController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LenderController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::post('/transaction', function (Request $request) {
//     return dd($request);
// })->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('items', ItemController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('borrowers', BorrowerController::class);
    Route::apiResource('lenders', LenderController::class);
    Route::apiResource('notify', NotificationController::class);
});
Route::get('/mailable', function () {
    $item = App\Models\Item::find(3);

    return new App\Mail\ItemDue($item);
});
