<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAboutProcessStepRequest;
use App\Http\Requests\UpdateAboutProcessStepRequest;
use App\Http\Resources\AboutProcessStepResource;
use App\Models\AboutProcessStep;
use Illuminate\Http\Request;

class AboutProcessStepController extends Controller
{
    public function index(Request $request)
    {
        return AboutProcessStepResource::collection(
            AboutProcessStep::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $search = $request->string('search')->toString();

                    $query->where('title', 'like', '%'.$search.'%')
                        ->orWhere('description', 'like', '%'.$search.'%');
                })
                ->orderBy('sort_order')
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreAboutProcessStepRequest $request): AboutProcessStepResource
    {
        return AboutProcessStepResource::make(AboutProcessStep::query()->create($request->validated()));
    }

    public function show(AboutProcessStep $aboutProcessStep): AboutProcessStepResource
    {
        return AboutProcessStepResource::make($aboutProcessStep);
    }

    public function update(UpdateAboutProcessStepRequest $request, AboutProcessStep $aboutProcessStep): AboutProcessStepResource
    {
        $aboutProcessStep->update($request->validated());

        return AboutProcessStepResource::make($aboutProcessStep->refresh());
    }

    public function destroy(AboutProcessStep $aboutProcessStep)
    {
        $aboutProcessStep->delete();

        return response()->noContent();
    }
}
