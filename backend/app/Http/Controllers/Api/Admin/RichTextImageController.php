<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RichTextImageController extends Controller
{
    use HandlesImageUploads;

    public function __invoke(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'max:6144'],
        ]);

        $path = $this->storeUploadedImage($request, 'image', 'rich-text');

        return response()->json([
            'path' => $path,
            'url' => asset('storage/'.$path),
        ]);
    }
}
