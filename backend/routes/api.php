<?php

use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\DonationController;
use App\Http\Controllers\Api\Admin\FaqController;
use App\Http\Controllers\Api\Admin\NewsController;
use App\Http\Controllers\Api\Admin\PartnerController;
use App\Http\Controllers\Api\Admin\ScholarshipController;
use App\Http\Controllers\Api\Admin\SiteSettingController;
use App\Http\Controllers\Api\Admin\TeamMemberController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicController;
use Illuminate\Support\Facades\Route;

Route::get('home', [PublicController::class, 'home']);
Route::get('news', [PublicController::class, 'news']);
Route::get('news/{news:slug}', [PublicController::class, 'newsShow']);
Route::get('scholarships', [PublicController::class, 'scholarships']);
Route::get('partners', [PublicController::class, 'partners']);
Route::get('team-members', [PublicController::class, 'teamMembers']);
Route::get('faqs', [PublicController::class, 'faqs']);
Route::get('settings', [PublicController::class, 'settings']);
Route::post('donations', [PublicController::class, 'donate']);

Route::post('admin/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('dashboard', DashboardController::class);

    Route::apiResource('news', NewsController::class);
    Route::apiResource('scholarships', ScholarshipController::class);
    Route::apiResource('donations', DonationController::class);
    Route::apiResource('partners', PartnerController::class);
    Route::apiResource('team-members', TeamMemberController::class);
    Route::apiResource('faqs', FaqController::class);
    Route::apiResource('settings', SiteSettingController::class);
});
