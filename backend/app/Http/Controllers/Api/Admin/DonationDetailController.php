<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDonationDetailRequest;
use App\Http\Requests\UpdateDonationDetailRequest;
use App\Http\Resources\DonationDetailResource;
use App\Models\DonationDetail;
use Illuminate\Http\Request;

class DonationDetailController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request)
    {
        return DonationDetailResource::collection(
            DonationDetail::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $search = $request->string('search')->toString();

                    $query->where('beneficiary', 'like', '%'.$search.'%')
                        ->orWhere('bank_name', 'like', '%'.$search.'%');
                })
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreDonationDetailRequest $request): DonationDetailResource
    {
        $data = $request->validated();
        $data['qr_image'] = $this->storeUploadedImage($request, 'qr_image', 'donations');
        $data['public_offer_document'] = $this->storeUploadedFile($request, 'public_offer_document', 'donations/offers');

        return DonationDetailResource::make(DonationDetail::query()->create($data));
    }

    public function show(DonationDetail $donationDetail): DonationDetailResource
    {
        return DonationDetailResource::make($donationDetail);
    }

    public function update(UpdateDonationDetailRequest $request, DonationDetail $donationDetail): DonationDetailResource
    {
        $data = $request->validated();
        $data['qr_image'] = $this->storeUploadedImage($request, 'qr_image', 'donations', $donationDetail->qr_image);
        $data['public_offer_document'] = $this->storeUploadedFile($request, 'public_offer_document', 'donations/offers', $donationDetail->public_offer_document);
        $donationDetail->update($data);

        return DonationDetailResource::make($donationDetail->refresh());
    }

    public function destroy(DonationDetail $donationDetail)
    {
        $this->deleteStoredImage($donationDetail->qr_image);
        $this->deleteStoredFile($donationDetail->public_offer_document);
        $donationDetail->delete();

        return response()->noContent();
    }
}
