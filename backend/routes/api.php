<?php

use App\Http\Controllers\Api\Admin\AboutDocumentController;
use App\Http\Controllers\Api\Admin\AboutProcessStepController;
use App\Http\Controllers\Api\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\DonationController;
use App\Http\Controllers\Api\Admin\DonationDetailController;
use App\Http\Controllers\Api\Admin\FaqController;
use App\Http\Controllers\Api\Admin\FundAchievementController;
use App\Http\Controllers\Api\Admin\FundPortfolioController;
use App\Http\Controllers\Api\Admin\NewsController;
use App\Http\Controllers\Api\Admin\PartnerController;
use App\Http\Controllers\Api\Admin\RichTextImageController;
use App\Http\Controllers\Api\Admin\ScholarshipApplicationController as AdminScholarshipApplicationController;
use App\Http\Controllers\Api\Admin\ScholarshipController;
use App\Http\Controllers\Api\Admin\SiteSettingController;
use App\Http\Controllers\Api\Admin\TeamMemberController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\ScholarshipApplicationController;
use Illuminate\Support\Facades\Route;

Route::get('home', [PublicController::class, 'home']);
Route::get('news', [PublicController::class, 'news']);
Route::get('news/{news:slug}', [PublicController::class, 'newsShow']);
Route::get('scholarships', [PublicController::class, 'scholarships']);
Route::get('partners', [PublicController::class, 'partners']);
Route::get('team-members', [PublicController::class, 'teamMembers']);
Route::get('faqs', [PublicController::class, 'faqs']);
Route::get('settings', [PublicController::class, 'settings']);

Route::middleware('throttle:12,1')->group(function () {
    Route::post('donations', [PublicController::class, 'donate']);
    Route::post('contact-messages', [ContactMessageController::class, 'store']);
    Route::post('scholarship-applications', [ScholarshipApplicationController::class, 'store']);
});

Route::post('admin/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('dashboard', DashboardController::class);

    Route::post('rich-text-images', RichTextImageController::class);
    Route::apiResource('news', NewsController::class);
    Route::apiResource('scholarships', ScholarshipController::class);
    Route::apiResource('scholarship-applications', AdminScholarshipApplicationController::class)
        ->parameters(['scholarship-applications' => 'scholarshipApplication'])
        ->except(['store']);
    Route::apiResource('contact-messages', AdminContactMessageController::class)
        ->parameters(['contact-messages' => 'contactMessage'])
        ->except(['store']);
    Route::apiResource('donations', DonationController::class);
    Route::apiResource('donation-details', DonationDetailController::class);
    Route::apiResource('about-process-steps', AboutProcessStepController::class);
    Route::apiResource('about-documents', AboutDocumentController::class);
    Route::apiResource('fund-portfolios', FundPortfolioController::class);
    Route::apiResource('fund-achievements', FundAchievementController::class);
    Route::apiResource('partners', PartnerController::class);
    Route::apiResource('team-members', TeamMemberController::class);
    Route::apiResource('faqs', FaqController::class);
    Route::apiResource('settings', SiteSettingController::class);
});
