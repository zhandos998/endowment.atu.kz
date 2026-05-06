<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSiteSettingRequest;
use App\Http\Requests\UpdateSiteSettingRequest;
use App\Http\Resources\SiteSettingResource;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request)
    {
        return SiteSettingResource::collection(
            SiteSetting::query()->latest()->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreSiteSettingRequest $request): SiteSettingResource
    {
        $data = $request->validated();
        $data['hero_image'] = $this->storeUploadedImage($request, 'hero_image', 'settings');

        return SiteSettingResource::make(SiteSetting::query()->create($data));
    }

    public function show(SiteSetting $setting): SiteSettingResource
    {
        return SiteSettingResource::make($setting);
    }

    public function update(UpdateSiteSettingRequest $request, SiteSetting $setting): SiteSettingResource
    {
        $data = $request->validated();
        $data['hero_image'] = $this->storeUploadedImage($request, 'hero_image', 'settings', $setting->hero_image);
        $setting->update($data);

        return SiteSettingResource::make($setting->refresh());
    }

    public function destroy(SiteSetting $setting)
    {
        $this->deleteStoredImage($setting->hero_image);
        $setting->delete();

        return response()->noContent();
    }
}
