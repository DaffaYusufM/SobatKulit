<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatbotController;

Route::get('/', function () {
    return view('landing-page');
});

Route::get('/chatbot', function () {
    return view('chatbot');
})->name('chatbot');

Route::post('/chat/send', [ChatbotController::class, 'sendMessage']);
