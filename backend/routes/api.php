<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group( function () {
    Route::prefix('users')->group(function () {
        Route::post('register', 'UserController@register');
        Route::post('login', 'UserController@login');
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

    Route::prefix('posts')->group(function () {
        Route::middleware('auth:api')->group(function(){
            Route::post('postImage', 'PostController@uploadPostImage');
        });
    });
    

    Route::prefix('followers')->group(function () {
        Route::post('/follow', 'FollowerController@follow');
        Route::get('/unfollow/{follower_id}/{followed_id}', 'FollowerController@unfollow');
    });
});