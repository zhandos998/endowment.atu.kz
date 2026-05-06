<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDonationRequest;
use App\Http\Requests\UpdateDonationRequest;
use App\Http\Resources\DonationResource;
use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function index(Request $request)
    {
        return DonationResource::collection(
            Donation::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $query->where('donor_name', 'like', '%'.$request->string('search')->toString().'%');
                })
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreDonationRequest $request): DonationResource
    {
        return DonationResource::make(Donation::query()->create($request->validated()));
    }

    public function show(Donation $donation): DonationResource
    {
        return DonationResource::make($donation);
    }

    public function update(UpdateDonationRequest $request, Donation $donation): DonationResource
    {
        $donation->update($request->validated());

        return DonationResource::make($donation->refresh());
    }

    public function destroy(Donation $donation)
    {
        $donation->delete();

        return response()->noContent();
    }
}
