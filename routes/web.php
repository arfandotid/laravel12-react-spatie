<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

// route login
Route::get('/login', [\App\Http\Controllers\Auth\LoginController::class, 'index'])
    ->name('login')
    ->middleware('guest');

// route login store
Route::post('/login', [\App\Http\Controllers\Auth\LoginController::class, 'store'])
    ->name('login.store')
    ->middleware('guest');

// route logout
Route::post('/logout', [\App\Http\Controllers\Auth\LoginController::class, 'logout'])
    ->name('logout');

Route::group(['middleware' => ['auth']], function () {
    // route dashboard
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    // route settings
    Route::get('/settings', [App\Http\Controllers\SettingController::class, 'index'])
        ->name('settings.index');

    // route settings update
    Route::put('/settings', [App\Http\Controllers\SettingController::class, 'update'])
        ->name('settings.update');

    // route settings delete logo
    Route::delete('/settings/delete-logo', [App\Http\Controllers\SettingController::class, 'deleteLogo'])
        ->name('settings.delete-logo');

    // route resource untuk permission
    Route::resource('/permissions', App\Http\Controllers\PermissionController::class);

    // route resource untuk role
    Route::resource('/roles', App\Http\Controllers\RoleController::class);

    // route resource untuk user
    Route::resource('/users', App\Http\Controllers\UserController::class);
});
