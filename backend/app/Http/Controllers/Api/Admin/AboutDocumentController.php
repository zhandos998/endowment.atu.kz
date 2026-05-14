<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAboutDocumentRequest;
use App\Http\Requests\UpdateAboutDocumentRequest;
use App\Http\Resources\AboutDocumentResource;
use App\Models\AboutDocument;
use Illuminate\Http\Request;

class AboutDocumentController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request)
    {
        return AboutDocumentResource::collection(
            AboutDocument::query()
                ->when($request->filled('category'), fn ($query) => $query->where('category', $request->string('category')->toString()))
                ->when($request->filled('search'), function ($query) use ($request) {
                    $search = $request->string('search')->toString();

                    $query->where(function ($query) use ($search) {
                        $query->where('title', 'like', '%'.$search.'%');
                    });
                })
                ->orderBy('sort_order')
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreAboutDocumentRequest $request): AboutDocumentResource
    {
        $data = $request->validated();
        unset($data['document']);
        $data['document_path'] = $this->storeUploadedFile($request, 'document', 'about-documents');

        return AboutDocumentResource::make(AboutDocument::query()->create($data));
    }

    public function show(AboutDocument $aboutDocument): AboutDocumentResource
    {
        return AboutDocumentResource::make($aboutDocument);
    }

    public function update(UpdateAboutDocumentRequest $request, AboutDocument $aboutDocument): AboutDocumentResource
    {
        $data = $request->validated();
        unset($data['document']);
        $data['document_path'] = $this->storeUploadedFile($request, 'document', 'about-documents', $aboutDocument->document_path);
        $aboutDocument->update($data);

        return AboutDocumentResource::make($aboutDocument->refresh());
    }

    public function destroy(AboutDocument $aboutDocument)
    {
        $this->deleteStoredFile($aboutDocument->document_path);
        $aboutDocument->delete();

        return response()->noContent();
    }
}
