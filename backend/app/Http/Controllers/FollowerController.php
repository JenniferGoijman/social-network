<?php

namespace App\Http\Controllers;

use App\Follower;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowerController extends Controller
{
    public function follow($followed_id)
    {
        try {
            $id = Auth::id();
            $user = User::find($id);
            $body = ['follower_id' => $user->id, 'followed_id' => $followed_id];
            $follow = Follower::create($body);
            return response($follow, 201);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage(),
                'message' => 'There was a problem trying to follow this user',
            ], 500);
        }
    }
    public function unfollow($followed_id)
    {
        try {
            $id = Auth::id();
            $user = User::find($id);
            $unfollow = Follower::where('follower_id', $user->id)->where('followed_id', $followed_id)->delete();            
            return response($unfollow, 201);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage(),
                'message' => 'There was a problem trying to unfollow this user',
            ], 500);
        }
    }
}
