<?php

namespace App\Http\Controllers;

use App\Follower;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    public function follow(Request $request)
    {
        try {
            $body = $request->all();
            $follower = Follower::create($body);
            
            $userfollower = User::find($body['follower_id']);
            $userfollower->increment('amount_followings');

            $userfollowed = User::find($body['followed_id']);
            $userfollowed->increment('amount_followers');

            return response($follower, 201);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage(),
                'message' => 'There was a problem trying to follow this user',
            ], 500);
        }
    }
    public function unfollow($follower_id, $followed_id)
    {
        try {
            $follower = Follower::where('follower_id', $follower_id)->where('followed_id', $followed_id)->delete();
            
            $userUnfollower = User::find($follower_id);
            $userUnfollower->amount_followings--;
            $userUnfollower->save();
            
            $userUnfollowed = User::find($followed_id);
            $userUnfollowed->amount_followers--;
            $userUnfollowed->save();
            
            return response($follower, 201);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage(),
                'message' => 'There was a problem trying to unfollow this user',
            ], 500);
        }
    }
}
