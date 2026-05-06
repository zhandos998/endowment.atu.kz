<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        $user = User::query()->where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Неверный email или пароль.',
            ], 422);
        }

        if (! $user->is_admin) {
            return response()->json([
                'message' => 'У пользователя нет доступа к админ-панели.',
            ], 403);
        }

        return response()->json([
            'token' => $user->createToken('admin-panel')->plainTextToken,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ],
        ]);
    }

    public function me(): JsonResponse
    {
        return response()->json([
            'user' => request()->user(),
        ]);
    }

    public function logout(): JsonResponse
    {
        request()->user()?->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Сессия завершена.',
        ]);
    }
}
