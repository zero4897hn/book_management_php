<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function rates() {
        return $this->hasMany('App\Rate', 'book_id', 'id');
    }

    public function comments() {
        return $this->hasMany('App\Comment', 'book_id', 'id');
    }

    public function user() {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
