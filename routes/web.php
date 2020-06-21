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

Route::get('/register', 'RegisterController@index');

Route::post('/register', 'RegisterController@create');

Route::get('/login', 'LoginController@index')->name('login');

Route::post('/login', 'LoginController@login');

Route::post('/logout', 'LoginController@logout')->name('logout');

Route::resource('/books', 'BookController');
