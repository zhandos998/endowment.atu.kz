<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScholarshipRequest;
use App\Http\Requests\UpdateScholarshipRequest;
use App\Http\Resources\ScholarshipResource;
use App\Models\Scholarship;
use Illuminate\Http\Request;

class ScholarshipController extends Controller
{
    public function index(Request $request)
    {
        return ScholarshipResource::collection(
            Scholarship::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $query->where('title', 'like', '%'.$request->string('search')->toString().'%');
                })
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreScholarshipRequest $request): ScholarshipResource
    {
        return ScholarshipResource::make(Scholarship::query()->create($request->validated()));
    }

    public function show(Scholarship $scholarship): ScholarshipResource
    {
        return ScholarshipResource::make($scholarship);
    }

    public function update(UpdateScholarshipRequest $request, Scholarship $scholarship): ScholarshipResource
    {
        $scholarship->update($request->validated());

        return ScholarshipResource::make($scholarship->refresh());
    }

    public function destroy(Scholarship $scholarship)
    {
        $scholarship->delete();

        return response()->noContent();
    }
}
