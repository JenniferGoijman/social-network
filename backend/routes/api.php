<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group( function () {
    Route::prefix('users')->group(function () {
        Route::post('register', 'UserController@register');
        Route::post('login', 'UserController@login');
        Route::put('password/{id}', 'UserController@resetPassword');
        Route::get('', 'UserController@getAll');
        
        Route::middleware('auth:api')->group(function(){
            Route::get('user','UserController@userInfo');
            Route::post('pic', 'UserController@uploadProfileImage');
            Route::get('logout','UserController@logout');
            Route::get('id/{id}','UserController@getById');
            Route::get('username/{username}','UserController@getByUsername');
            Route::put('update', 'UserController@update');
        });
    });
    
    Route::prefix('followers')->group(function () {
        Route::middleware('auth:api')->group(function(){
            Route::get('/follow/{followed_id}', 'FollowerController@follow');
            Route::get('/unfollow/{followed_id}', 'FollowerController@unfollow');
        });
    });

    Route::prefix('posts')->group(function () {
        Route::middleware('auth:api')->group(function(){
            Route::post('post', 'PostController@uploadPost');
            Route::delete('{post_id}', 'PostController@deletePost');
            Route::get('post/{post_id}', 'PostController@getById');
            Route::get('', 'PostController@getFeed');
            Route::get('like/{post_id}', 'LikeController@like');
            Route::get('unlike/{post_id}', 'LikeController@unlike');
            Route::post('comment', 'CommentController@insert');
        });
    });
});