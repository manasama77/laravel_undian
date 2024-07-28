<?php

use App\Http\Controllers\UndianController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/undian/show_peserta/{is_winner}', [UndianController::class, 'show_peserta']);
Route::post('/undian/store_peserta', [UndianController::class, 'store_peserta']);
Route::post('/undian/store_pemenang', [UndianController::class, 'store_pemenang']);
