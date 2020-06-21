<?php

namespace App\Http\Controllers;

use Facade\FlareClient\View;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function index()
    {
        return View('register');
    }

    public function create()
    {
        //
    }
}
