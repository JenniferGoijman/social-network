<?php

namespace App\Http\Controllers;

use App\User;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Aws\S3\S3Client;

class PostController extends Controller
{
    public function uploadPostImage(Request $request)
    {
        try {
            $request->validate(['image' => 'required|image']);
            $image_path = $request->image->store('images','s3');
            
            $user = Auth::user();
            $body = ['image' => $image_path, 'description' => $request->description, 'user_id' => $user->id];
            
            $post = Post::create($body);
            return response($post);
        } catch (\Exception $e) {
            return response(['error' => $e,], 500);
        }
    }
    public function getFeed() 
    {
        $user = Auth::user();
        $userIds = $user->followings()->pluck('followed_id');
        return Post::whereIn('user_id', $userIds)->with('user')->with('likes')->with('comments')->latest()->get();
    }
    public function getById($id) 
    {
        return Post::Find($id)->load('user', 'likes', 'comments');
    }
    public function deletePost($id) {          
        $post = Post::Find($id);

        Storage::disk('s3')->delete($post->image);
        
        $post->delete();
        return response($post);
    }
}
