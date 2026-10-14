<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // The page itself is a shell, React fetches the item from the API
    Route::get('/item/{id}', fn ($id) => Inertia::render('Item', ['id' => $id]))->name('item');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Linked from the reminder email. The borrower has no account, so the URL is
// signed instead: it only works exactly as we generated it.
Route::get('/items/{item}/returned', [NotificationController::class, 'markAsReturned'])
    ->middleware('signed')
    ->name('item.return.notify');

require __DIR__ . '/auth.php';
