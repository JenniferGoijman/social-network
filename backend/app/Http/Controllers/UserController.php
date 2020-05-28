<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            $body = $request->all();
            $body['password'] = Hash::make($body['password']);
            $body['role'] = 'customer';
            $user = User::create($body);
            return response($user, 201);
        } catch (\Exception $e) {
            return response(['message' => 'Hubo un problema para registrar el usuario', 'error' => $e->getMessage()], 500);
        }
    }
    public function login(Request $request)
    {
        $usernameOrEmail = $request->input('usernameOrEmail');
        $password = $request->input('password');
        
        if (Str::contains($usernameOrEmail, '@')) {
            $credentials = ['email' => $usernameOrEmail, 'password' => $password];
        } else {
            $credentials = ['username' => $usernameOrEmail, 'password' => $password];
        }

        //dd($credentials);
        
        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Wrong Credentials'], 400);
        }
        $user = Auth::user();
        $token = $user->createToken('authToken')->accessToken;
        return response(['user' => $user, 'token' => $token]);

        // $credentials = $request->only('username', 'password');
        // if (!Auth::attempt($credentials)) {
        //     return response(['message' => 'Wrong Credentials'], 400);
        // }
        // $user = Auth::user();
        // $token = $user->createToken('authToken')->accessToken;
        // return response(['user' => $user, 'token' => $token]);
    }
}
