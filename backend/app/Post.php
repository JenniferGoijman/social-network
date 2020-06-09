<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'image', 'description', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo('\App\User');
    }
    public function likes()
    {
        return $this->hasMany('\App\Like')->with('user');
    }
    public function comments()
    {
        return $this->hasMany('\App\Comment')->with('user');
    }
}
