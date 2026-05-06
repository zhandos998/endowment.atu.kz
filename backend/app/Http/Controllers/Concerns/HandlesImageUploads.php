<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HandlesImageUploads
{
    protected function storeUploadedImage(Request $request, string $field, string $directory, ?string $current = null): ?string
    {
        if (! $request->hasFile($field)) {
            return $current;
        }

        $this->deleteStoredImage($current);

        return $request->file($field)->store($directory, 'public');
    }

    protected function deleteStoredImage(?string $path): void
    {
        if (! $path || str_starts_with($path, 'http')) {
            return;
        }

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
