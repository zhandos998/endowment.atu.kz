<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsResource;
use App\Models\News;
use App\Support\HtmlSanitizer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request)
    {
        return NewsResource::collection(
            News::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $query->where('title', 'like', '%'.$request->string('search')->toString().'%');
                })
                ->latest('published_at')
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreNewsRequest $request): NewsResource
    {
        $data = $request->validated();
        $data['slug'] = $this->uniqueSlug($data['slug'] ?? $data['title']);
        $data['content'] = HtmlSanitizer::sanitize($data['content']);
        $data['image'] = $this->storeUploadedImage($request, 'image', 'news');

        return NewsResource::make(News::query()->create($data));
    }

    public function show(News $news): NewsResource
    {
        return NewsResource::make($news);
    }

    public function update(UpdateNewsRequest $request, News $news): NewsResource
    {
        $data = $request->validated();

        if (array_key_exists('title', $data) || array_key_exists('slug', $data)) {
            $data['slug'] = $this->uniqueSlug($data['slug'] ?? $data['title'] ?? $news->title, $news->id);
        }

        if (array_key_exists('content', $data)) {
            $data['content'] = HtmlSanitizer::sanitize($data['content']);
        }

        $data['image'] = $this->storeUploadedImage($request, 'image', 'news', $news->image);
        $news->update($data);

        return NewsResource::make($news->refresh());
    }

    public function destroy(News $news)
    {
        $this->deleteStoredImage($news->image);
        $news->delete();

        return response()->noContent();
    }

    private function uniqueSlug(string $source, ?int $ignoreId = null): string
    {
        $base = Str::slug($source) ?: 'news';
        $slug = $base;
        $counter = 2;

        while (News::query()
            ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
            ->where('slug', $slug)
            ->exists()) {
            $slug = $base.'-'.$counter;
            $counter++;
        }

        return $slug;
    }
}
