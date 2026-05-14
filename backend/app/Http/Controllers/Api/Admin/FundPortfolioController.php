<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFundPortfolioRequest;
use App\Http\Requests\UpdateFundPortfolioRequest;
use App\Http\Resources\FundPortfolioResource;
use App\Models\FundPortfolio;
use Illuminate\Http\Request;

class FundPortfolioController extends Controller
{
    public function index(Request $request)
    {
        return FundPortfolioResource::collection(
            FundPortfolio::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $search = $request->string('search')->toString();

                    $query->where('title', 'like', '%'.$search.'%')
                        ->orWhere('direction', 'like', '%'.$search.'%');
                })
                ->orderBy('sort_order')
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreFundPortfolioRequest $request): FundPortfolioResource
    {
        return FundPortfolioResource::make(FundPortfolio::query()->create($request->validated()));
    }

    public function show(FundPortfolio $fundPortfolio): FundPortfolioResource
    {
        return FundPortfolioResource::make($fundPortfolio);
    }

    public function update(UpdateFundPortfolioRequest $request, FundPortfolio $fundPortfolio): FundPortfolioResource
    {
        $fundPortfolio->update($request->validated());

        return FundPortfolioResource::make($fundPortfolio->refresh());
    }

    public function destroy(FundPortfolio $fundPortfolio)
    {
        $fundPortfolio->delete();

        return response()->noContent();
    }
}
