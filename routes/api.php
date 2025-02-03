<?php

use App\Http\Controllers\BorrowerController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LenderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::resource('items', ItemController::class);

Route::resource('users', UserController::class);
Route::resource('borrowers', BorrowerController::class);
Route::resource('lenders', LenderController::class);

//created via the resource route
// Action	Method	Endpoint	Controller Method
// Get all users	GET	/api/users	index()
// Get single user	GET	/api/users/{id}	show($id)
// Create user	POST	/api/users	store(Request $request)
// Update user	PUT/PATCH	/api/users/{id}	update(Request $request, $id)
// Delete user	DELETE	/api/users/{id}	destroy($id)
