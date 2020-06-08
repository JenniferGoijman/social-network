<?php

namespace App\Http\Controllers;

use App\User;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CommentController extends Controller
{
    public function insert(Request $request, $post_id)
    {
        try {
            $id = Auth::id();
            $user = User::find($id);
            $body = ['user_id' => $user->id, 'post_id' => $post_id, 'body' => $request->input('body')];
            $like = Comment::create($body);
            return response($like, 201);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage(),
                'message' => 'There was a problem trying to post the comment',
            ], 500);
        }
    }
}
