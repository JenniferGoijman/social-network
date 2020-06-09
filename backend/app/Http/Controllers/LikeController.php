<?php

namespace App\Http\Controllers;

use App\Like;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function like($post_id)
    {
        try {
            $id = Auth::id();
            $user = User::find($id);
            $body = ['user_id' => $user->id, 'post_id' => $post_id];
            $alreadyExists = Like::where('user_id',$user->id)->where('post_id',$post_id)->get()->count();
            if ($alreadyExists > 0) {
                return response("You have already liked this post");
            } else if ($alreadyExists) {
                $like = Like::create($body);
                return response($like, 201);
            }
            $like = Like::create($body);
            return response($like, 201);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage(),
                'message' => 'There was a problem trying to like this user',
            ], 500);
        }
    }
    public function unlike($post_id)
    {
        try {
            $id = Auth::id();
            $user = User::find($id);
            $unlike = Like::where('user_id', $user->id)->where('post_id', $post_id)->delete();            
            return response($unlike, 201);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage(),
                'message' => 'There was a problem trying to unlike this post',
            ], 500);
        }
    }
}
