<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFundAchievementRequest;
use App\Http\Requests\UpdateFundAchievementRequest;
use App\Http\Resources\FundAchievementResource;
use App\Models\FundAchievement;
use Illuminate\Http\Request;

class FundAchievementController extends Controller
{
    public function index(Request $request)
    {
        return FundAchievementResource::collection(
            FundAchievement::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $query->where('title', 'like', '%'.$request->string('search')->toString().'%');
                })
                ->orderBy('sort_order')
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreFundAchievementRequest $request): FundAchievementResource
    {
        return FundAchievementResource::make(FundAchievement::query()->create($request->validated()));
    }

    public function show(FundAchievement $fundAchievement): FundAchievementResource
    {
        return FundAchievementResource::make($fundAchievement);
    }

    public function update(UpdateFundAchievementRequest $request, FundAchievement $fundAchievement): FundAchievementResource
    {
        $fundAchievement->update($request->validated());

        return FundAchievementResource::make($fundAchievement->refresh());
    }

    public function destroy(FundAchievement $fundAchievement)
    {
        $fundAchievement->delete();

        return response()->noContent();
    }
}
