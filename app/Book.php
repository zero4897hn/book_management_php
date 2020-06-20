<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    public function rates() {
        return $this->hasMany('App\Rate', 'book_id', 'id');
    }

    public function comments() {
        return $this->hasMany('App\Comment', 'book_id', 'id');
    }

    public function user() {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function category() {
        return $this->belongsTo('App\Category', 'category_id', 'id');
    }
}
