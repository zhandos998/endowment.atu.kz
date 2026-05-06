<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeamMemberRequest;
use App\Http\Requests\UpdateTeamMemberRequest;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request)
    {
        return TeamMemberResource::collection(
            TeamMember::query()
                ->when($request->filled('search'), function ($query) use ($request) {
                    $query->where('name', 'like', '%'.$request->string('search')->toString().'%')
                        ->orWhere('role', 'like', '%'.$request->string('search')->toString().'%');
                })
                ->latest()
                ->paginate($request->integer('per_page', 10))
        );
    }

    public function store(StoreTeamMemberRequest $request): TeamMemberResource
    {
        $data = $request->validated();
        $data['photo'] = $this->storeUploadedImage($request, 'photo', 'team');

        return TeamMemberResource::make(TeamMember::query()->create($data));
    }

    public function show(TeamMember $teamMember): TeamMemberResource
    {
        return TeamMemberResource::make($teamMember);
    }

    public function update(UpdateTeamMemberRequest $request, TeamMember $teamMember): TeamMemberResource
    {
        $data = $request->validated();
        $data['photo'] = $this->storeUploadedImage($request, 'photo', 'team', $teamMember->photo);
        $teamMember->update($data);

        return TeamMemberResource::make($teamMember->refresh());
    }

    public function destroy(TeamMember $teamMember)
    {
        $this->deleteStoredImage($teamMember->photo);
        $teamMember->delete();

        return response()->noContent();
    }
}
