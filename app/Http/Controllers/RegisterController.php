<?php

namespace App\Http\Controllers;

use App\User;
use Facade\FlareClient\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function index()
    {
        return View('auth.register');
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|max:50',
            'password' => 'required|max:50|confirmed',
            'password_confirmation' => 'required|max:50',
            'email' => 'required|max:50|email'
        ]);

        if ($validator->fails()) {
            return redirect('/register')->withErrors($validator)->withInput();
        }

        $username = $request->input('username');

        $usernameCount = DB::table('users')->where('username', '=', $username)->count();
        if ($usernameCount > 0) {
            return redirect('/register')->with('usernameError', 'Tên đăng nhập đã tồn tại');
        }

        $user = new User();
        $user->username = $username;
        $user->password = Hash::make($request->input('password'));
        $user->email = $request->input('email');

        $adminCount = DB::table('users')->where('admin', '=', true)->count();
        if ($adminCount < 1) {
            $user->admin = true;
        }

        $user->save();

        return View('auth.register-success');
    }
}
