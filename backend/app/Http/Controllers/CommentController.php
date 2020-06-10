<?php

namespace App\Http\Controllers;

use App\User;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CommentController extends Controller
{
    public function insert(Request $request)
    {
        try {
            $body = $request->validate([
                'post_id'=>'required|integer',
                'body'=>'required|string',
            ]);
            $body['user_id' ] = Auth::user()->id;
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
