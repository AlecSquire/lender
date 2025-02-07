<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/transaction', function (Request $request) {
//     return $request->transaction();
// })->middleware('auth:sanctum');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/Lend', function () {
//     return Inertia::render('Lend');
// })->middleware(['auth', 'verified'])->name('Lend');
// //items
// Route::resource('items', ItemController::class)
//     ->only(['index', 'store'])
//     ->middleware(['auth', 'verified']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
    Route::get('/user/{id}/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::delete('/user/{id}/delete', [UserController::class, 'delete'])->name('user.delete');
});
//lender
// Route::get('/users', function () {
//     return Inertia::render('Users');
// })->middleware(['auth', 'verified'])->name('users');
// //borrower
// Route::get('/borrower', function () {
//     return Inertia::render('Borrower');
// })->middleware(['auth', 'verified'])->name('borrower');

// Route::get('/lender', function () {
//     return Inertia::render('Lender');
// })->middleware(['auth', 'verified'])->name('lender');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
