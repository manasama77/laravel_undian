<?php

use App\Http\Controllers\UndianController;
use Illuminate\Support\Facades\Route;

Route::get('/', [UndianController::class, 'index'])->name('home');
