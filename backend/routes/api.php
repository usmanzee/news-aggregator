<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\CategoryController;

Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/sources', [NewsController::class, 'getNewSources']);
Route::post('/news-feed', [NewsController::class, 'getNewsFeed']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});