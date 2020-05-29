<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group( function () {
    Route::prefix('users')->group(function () {
        Route::post('register', 'UserController@register');
        Route::post('login', 'UserController@login');
        Route::post('image/{id}', 'UserController@uploadImage');
        
        Route::middleware('auth:api')->group(function(){
            Route::get('logout','UserController@logout');
            Route::get('followings/{id}','UserController@getFollowings');
            Route::get('followers/{id}','UserController@getFollowers');
        });
    });
});