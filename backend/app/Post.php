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
        //return $this->hasMany('\App\Like')->with('user');
        return $this->hasMany('\App\Like');
    }
}
