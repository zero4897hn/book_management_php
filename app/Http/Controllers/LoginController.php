<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function index()
    {
        return View('auth.login');
    }

    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        $validator = Validator::make($request->all(), [
            'username' => 'required|max:50',
            'password' => 'required|max:50',
        ]);

        if ($validator->fails()) {
            return redirect('/login')->withErrors($validator)->withInput();
        }

        if (Auth::attempt(['username' => $username, 'password' => $password])) {
            return redirect('/');
        } else {
            return redirect('/login')->with('error', 'Sai tên đăng nhập hoặc mật khẩu.');
        }
    }

    public function logout(Request $request) {
        Auth::logout();
        return redirect('/login');
    }
}
