<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/getUsers', function () {
    $users = (new ProfileController)->getUsers();
    return response()->json($users);
})->middleware(['auth', 'verified']);
