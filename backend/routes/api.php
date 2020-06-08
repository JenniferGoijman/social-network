<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group( function () {
    Route::prefix('users')->group(function () {
        Route::post('register', 'UserController@register');
        Route::post('login', 'UserController@login');
        Route::put('resetPassword/{id}', 'UserController@resetPassword');
        Route::get('', 'UserController@getAll');
        
        Route::middleware('auth:api')->group(function(){
            Route::get('user','UserController@userInfo');
            Route::post('profileImage', 'UserController@uploadProfileImage');
            Route::get('logout','UserController@logout');
            Route::get('byId/{id}','UserController@getById');
            Route::get('byUsername/{username}','UserController@getByUsername');
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
            Route::post('postImage', 'PostController@uploadPostImage');
            Route::delete('{id}', 'PostController@deletePost');
            Route::get('', 'PostController@getFeed');
            Route::get('like/{id}', 'LikeController@like');
            Route::get('unlike/{id}', 'LikeController@unlike');
        });
    });
});