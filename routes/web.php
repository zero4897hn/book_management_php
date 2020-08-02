<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;

Route::get('/', 'HomeController@index');

Route::post('api/register', 'RegisterController@create');

Route::post('api/login', 'LoginController@login');

Route::post('api/logout', 'AuthController@logout');

Route::get('api/auth', 'AuthController@user');

Route::resource('api/books', 'BookController');

Route::post('api/books/update/{id}', 'BookController@updateBook');

Route::resource('api/users', 'UserController');

Route::post('api/users/update/{id}', 'UserController@updateUser');

Route::post('api/users/block', 'UserController@block');

Route::post('api/users/unblock', 'UserController@unblock');

Route::resource('api/comments', 'CommentController');

Route::get('/user/non-admin', function () {
    return View('auth.non-admin');
});

Route::view('/{path?}', 'home');

Route::view('/{path?}/{name?}', 'home');

Route::post('api/rating', 'RateController@save');

Route::post('api/token/refresh', 'AuthController@refresh');

Route::get('api/rate/book/{id}', 'RateController@getOne');
