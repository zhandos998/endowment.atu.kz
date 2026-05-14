<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Http\Resources\DonationResource;
use App\Http\Resources\NewsResource;
use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\DonationDetail;
use App\Models\Faq;
use App\Models\FundAchievement;
use App\Models\FundPortfolio;
use App\Models\News;
use App\Models\Partner;
use App\Models\Scholarship;
use App\Models\ScholarshipApplication;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'cards' => [
                'news' => News::query()->count(),
                'scholarships' => Scholarship::query()->count(),
                'scholarship_applications' => ScholarshipApplication::query()->count(),
                'contact_messages' => ContactMessage::query()->count(),
                'donations' => Donation::query()->sum('amount'),
                'donation_details' => DonationDetail::query()->count(),
                'fund_portfolios' => FundPortfolio::query()->count(),
                'fund_achievements' => FundAchievement::query()->count(),
                'partners' => Partner::query()->count(),
                'team_members' => TeamMember::query()->count(),
                'faqs' => Faq::query()->count(),
            ],
            'recent_news' => NewsResource::collection(News::query()->latest('published_at')->limit(5)->get()),
            'recent_contact_messages' => ContactMessageResource::collection(ContactMessage::query()->latest()->limit(5)->get()),
            'recent_donations' => DonationResource::collection(Donation::query()->latest()->limit(5)->get()),
        ]);
    }
}
