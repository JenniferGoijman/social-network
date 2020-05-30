<?php

namespace App\Http\Controllers;

use App\Follower;
use App\User;
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
            //$userfollower->update(['amount_followings' => $userfollower['amount_followings']+1]);

            $userfollowed = User::find($body['followed_id']);
            $userfollowed->increment('amount_followers');
            //$userfollowed->update(['amount_followers' => $userfollowed['amount_followers']+1]);

            return response($follower, 201);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage(),
                'message' => 'There was a problem trying to follow this user',
            ], 500);
        }
    }
}
