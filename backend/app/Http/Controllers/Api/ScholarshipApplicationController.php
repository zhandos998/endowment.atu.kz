<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScholarshipApplicationRequest;
use App\Http\Resources\ScholarshipApplicationResource;
use App\Models\ScholarshipApplication;

class ScholarshipApplicationController extends Controller
{
    public function store(StoreScholarshipApplicationRequest $request): ScholarshipApplicationResource
    {
        $data = $request->validated();
        unset($data['documents']);

        $data['documents'] = collect($request->file('documents', []))
            ->map(fn ($file) => [
                'name' => $file->getClientOriginalName(),
                'path' => $file->store('scholarship-applications', 'public'),
                'mime' => $file->getClientMimeType(),
                'size' => $file->getSize(),
            ])
            ->values()
            ->all();

        return ScholarshipApplicationResource::make(ScholarshipApplication::query()->create($data)->load('scholarship'));
    }
}
