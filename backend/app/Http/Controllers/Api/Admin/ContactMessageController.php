<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateContactMessageRequest;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        return ContactMessageResource::collection(
            ContactMessage::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $search = $request->string('search')->toString();

                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', '%'.$search.'%')
                            ->orWhere('email', 'like', '%'.$search.'%')
                            ->orWhere('phone', 'like', '%'.$search.'%')
                            ->orWhere('subject', 'like', '%'.$search.'%');
                    });
                })
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function show(ContactMessage $contactMessage): ContactMessageResource
    {
        return ContactMessageResource::make($contactMessage);
    }

    public function update(UpdateContactMessageRequest $request, ContactMessage $contactMessage): ContactMessageResource
    {
        $contactMessage->update($request->validated());

        return ContactMessageResource::make($contactMessage->refresh());
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();

        return response()->noContent();
    }
}
