<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    public function store(StoreContactMessageRequest $request): ContactMessageResource
    {
        return ContactMessageResource::make(ContactMessage::query()->create($request->validated()));
    }
}
