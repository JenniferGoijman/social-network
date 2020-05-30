<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    protected $fillable = [ 'follower_id', 'followed_id'
    ];
}
