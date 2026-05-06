<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePartnerRequest;
use App\Http\Requests\UpdatePartnerRequest;
use App\Http\Resources\PartnerResource;
use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request)
    {
        return PartnerResource::collection(
            Partner::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $query->where('name', 'like', '%'.$request->string('search')->toString().'%');
                })
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StorePartnerRequest $request): PartnerResource
    {
        $data = $request->validated();
        $data['logo'] = $this->storeUploadedImage($request, 'logo', 'partners');

        return PartnerResource::make(Partner::query()->create($data));
    }

    public function show(Partner $partner): PartnerResource
    {
        return PartnerResource::make($partner);
    }

    public function update(UpdatePartnerRequest $request, Partner $partner): PartnerResource
    {
        $data = $request->validated();
        $data['logo'] = $this->storeUploadedImage($request, 'logo', 'partners', $partner->logo);
        $partner->update($data);

        return PartnerResource::make($partner->refresh());
    }

    public function destroy(Partner $partner)
    {
        $this->deleteStoredImage($partner->logo);
        $partner->delete();

        return response()->noContent();
    }
}
