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
            $body['pic'] = 'nopic.png';
            $body['amount_posts'] = 0;
            $body['amount_followers'] = 0;
            $body['amount_followings'] = 0;
            $body['description'] = '';
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
        
        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Wrong Credentials'], 400);
        }
        $user = Auth::user();
        $token = $user->createToken('authToken')->accessToken;
        return response(['user' => $user, 'token' => $token]);
    }
    public function logout()
    {
        try {
            Auth::user()->token()->revoke();
            return response([
                'message'=>'User successfully disconected.'
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => 'There was an error trying to login the user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function uploadImage(Request $request, $id)
    {
        try {
            $request->validate(['image' => 'required|image']);
            $imageName = time() . '-' . request()->image->getClientOriginalName();
            request()->image->move(public_path('images'), $imageName);

            $user = User::find($id);
            $user->update(['pic' => $imageName]);
            return response($user);
        } catch (\Exception $e) {
            return response(['error' => $e,], 500);
        }
    }
    public function getFollowings($id) {
        $user = User::find($id);
        return $user->followers()->get();
    }
    public function getFollowers($id) {
        $user = User::find($id);
        return $user->followings()->get();
    }
    public function getAll()
    {
        try {
            return User::all();
        } catch (\Exception $e) {
            return response([
                'error' => $e
            ], 500);
        }
    }
    public function update(Request $request) {
        try {
            $body = $request->validate([
                'name' => 'required|string',
                'username' => 'required|string',
                'description' => 'required|string',
                'email' => 'required|string']);
            $id = Auth::id();
            $user = User::find($id);
            $user->update($body);
            return response($user);
        } catch (\Exception $e) {
            return response([
                'error' => $e
            ], 500);
        }
    }
    public function userInfo() {
        try {
            $user = Auth::user();
            return response($user);
        } catch (\Exception $e) {
            return response([
                'message' => 'There was an error trying to get the user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
