<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFaqRequest;
use App\Http\Requests\UpdateFaqRequest;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        return FaqResource::collection(
            Faq::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $query->where('question', 'like', '%'.$request->string('search')->toString().'%');
                })
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreFaqRequest $request): FaqResource
    {
        return FaqResource::make(Faq::query()->create($request->validated()));
    }

    public function show(Faq $faq): FaqResource
    {
        return FaqResource::make($faq);
    }

    public function update(UpdateFaqRequest $request, Faq $faq): FaqResource
    {
        $faq->update($request->validated());

        return FaqResource::make($faq->refresh());
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return response()->noContent();
    }
}
