<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
}
