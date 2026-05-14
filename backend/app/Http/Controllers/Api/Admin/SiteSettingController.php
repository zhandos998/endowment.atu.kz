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
        $data['fund_logo'] = $this->storeUploadedImage($request, 'fund_logo', 'settings');
        $data['executive_director_photo'] = $this->storeUploadedImage($request, 'executive_director_photo', 'settings');

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
        $data['fund_logo'] = $this->storeUploadedImage($request, 'fund_logo', 'settings', $setting->fund_logo);
        $data['executive_director_photo'] = $this->storeUploadedImage($request, 'executive_director_photo', 'settings', $setting->executive_director_photo);
        $setting->update($data);

        return SiteSettingResource::make($setting->refresh());
    }

    public function destroy(SiteSetting $setting)
    {
        $this->deleteStoredImage($setting->hero_image);
        $this->deleteStoredImage($setting->fund_logo);
        $this->deleteStoredImage($setting->executive_director_photo);
        $setting->delete();

        return response()->noContent();
    }
}
