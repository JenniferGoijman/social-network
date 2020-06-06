<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'name', 'email', 'password', 'pic', 'description', 
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function followers()
    {
        return $this->belongsToMany(
            self::class,
            'followers',
            'followed_id',
            'follower_id',
        );
    }
    public function followings()
    {
        return $this->belongsToMany(
            self::class,
            'followers',
            'follower_id',
            'followed_id',
        );
    }
    public function posts()
    {
        return $this->hasMany('\App\Post')->orderBy('created_at', 'desc')->with('user');
    }
}
