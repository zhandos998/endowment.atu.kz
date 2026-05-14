<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HandlesImageUploads
{
    protected function storeUploadedFile(Request $request, string $field, string $directory, ?string $current = null): ?string
    {
        if (! $request->hasFile($field)) {
            return $current;
        }

        $this->deleteStoredFile($current);

        return $request->file($field)->store($directory, 'public');
    }

    protected function storeUploadedImage(Request $request, string $field, string $directory, ?string $current = null): ?string
    {
        return $this->storeUploadedFile($request, $field, $directory, $current);
    }

    protected function deleteStoredFile(?string $path): void
    {
        if (! $path || str_starts_with($path, 'http')) {
            return;
        }

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    protected function deleteStoredImage(?string $path): void
    {
        $this->deleteStoredFile($path);
    }
}
