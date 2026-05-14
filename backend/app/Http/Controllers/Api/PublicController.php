<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDonationRequest;
use App\Http\Resources\AboutDocumentResource;
use App\Http\Resources\AboutProcessStepResource;
use App\Http\Resources\DonationDetailResource;
use App\Http\Resources\DonationResource;
use App\Http\Resources\FaqResource;
use App\Http\Resources\FundAchievementResource;
use App\Http\Resources\FundPortfolioResource;
use App\Http\Resources\NewsResource;
use App\Http\Resources\PartnerResource;
use App\Http\Resources\ScholarshipResource;
use App\Http\Resources\SiteSettingResource;
use App\Http\Resources\TeamMemberResource;
use App\Models\AboutDocument;
use App\Models\AboutProcessStep;
use App\Models\Donation;
use App\Models\DonationDetail;
use App\Models\Faq;
use App\Models\FundAchievement;
use App\Models\FundPortfolio;
use App\Models\News;
use App\Models\Partner;
use App\Models\Scholarship;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function home(): JsonResponse
    {
        $settings = SiteSetting::query()->latest()->first();
        $donationDetail = DonationDetail::query()->where('is_active', true)->latest()->first();
        $founder = TeamMember::query()
            ->where('is_active', true)
            ->where('category', 'founder')
            ->orderBy('sort_order')
            ->first();

        return response()->json([
            'settings' => $settings ? SiteSettingResource::make($settings) : null,
            'fund_portfolios' => FundPortfolioResource::collection(
                FundPortfolio::query()->where('is_active', true)->orderBy('sort_order')->limit(5)->get()
            ),
            'achievements' => FundAchievementResource::collection(
                FundAchievement::query()->where('is_active', true)->orderBy('sort_order')->limit(6)->get()
            ),
            'board_members' => TeamMemberResource::collection(
                TeamMember::query()
                    ->where('is_active', true)
                    ->where('category', 'board')
                    ->orderBy('sort_order')
                    ->limit(12)
                    ->get()
            ),
            'founder' => $founder ? TeamMemberResource::make($founder) : null,
            'donation_detail' => $donationDetail ? DonationDetailResource::make($donationDetail) : null,
            'about_process_steps' => AboutProcessStepResource::collection(AboutProcessStep::query()->where('is_active', true)->orderBy('sort_order')->get()),
            'about_documents' => AboutDocumentResource::collection(AboutDocument::query()->where('is_active', true)->orderBy('sort_order')->latest()->get()),
            'scholarships' => ScholarshipResource::collection(Scholarship::query()->latest()->limit(3)->get()),
            'news' => NewsResource::collection(News::query()->latest('published_at')->limit(3)->get()),
            'partners' => PartnerResource::collection(Partner::query()->latest()->limit(8)->get()),
            'team_members' => TeamMemberResource::collection(TeamMember::query()->where('is_active', true)->orderBy('sort_order')->limit(8)->get()),
            'faqs' => FaqResource::collection(Faq::query()->latest()->limit(6)->get()),
        ]);
    }

    public function news(Request $request)
    {
        return NewsResource::collection(
            News::query()
                ->latest('published_at')
                ->paginate($request->integer('per_page', 9))
        );
    }

    public function newsShow(News $news): NewsResource
    {
        return NewsResource::make($news);
    }

    public function scholarships(Request $request)
    {
        return ScholarshipResource::collection(
            Scholarship::query()->latest()->paginate($request->integer('per_page', 9))
        );
    }

    public function partners(Request $request)
    {
        return PartnerResource::collection(
            Partner::query()->latest()->paginate($request->integer('per_page', 12))
        );
    }

    public function teamMembers(Request $request)
    {
        return TeamMemberResource::collection(
            TeamMember::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->paginate($request->integer('per_page', 12))
        );
    }

    public function faqs()
    {
        return FaqResource::collection(Faq::query()->latest()->get());
    }

    public function settings(): SiteSettingResource
    {
        return SiteSettingResource::make(SiteSetting::query()->latest()->first());
    }

    public function donate(StoreDonationRequest $request): DonationResource
    {
        return DonationResource::make(Donation::query()->create($request->validated()));
    }
}
