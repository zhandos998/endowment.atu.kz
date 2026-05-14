<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateScholarshipApplicationRequest;
use App\Http\Resources\ScholarshipApplicationResource;
use App\Models\ScholarshipApplication;
use Illuminate\Http\Request;

class ScholarshipApplicationController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request)
    {
        return ScholarshipApplicationResource::collection(
            ScholarshipApplication::query()
                ->with('scholarship')
                ->when($request->filled('search'), function ($query) use ($request) {
                    $search = $request->string('search')->toString();

                    $query->where(function ($query) use ($search) {
                        $query->where('applicant_name', 'like', '%'.$search.'%')
                            ->orWhere('email', 'like', '%'.$search.'%')
                            ->orWhere('phone', 'like', '%'.$search.'%');
                    });
                })
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function show(ScholarshipApplication $scholarshipApplication): ScholarshipApplicationResource
    {
        return ScholarshipApplicationResource::make($scholarshipApplication->load('scholarship'));
    }

    public function update(UpdateScholarshipApplicationRequest $request, ScholarshipApplication $scholarshipApplication): ScholarshipApplicationResource
    {
        $scholarshipApplication->update($request->validated());

        return ScholarshipApplicationResource::make($scholarshipApplication->refresh()->load('scholarship'));
    }

    public function destroy(ScholarshipApplication $scholarshipApplication)
    {
        foreach ($scholarshipApplication->documents ?? [] as $document) {
            $this->deleteStoredFile($document['path'] ?? null);
        }

        $scholarshipApplication->delete();

        return response()->noContent();
    }
}
