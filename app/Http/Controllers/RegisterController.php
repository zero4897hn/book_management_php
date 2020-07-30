<?php

namespace App\Http\Controllers;

use App\User;
use Facade\FlareClient\View;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function index()
    {
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|max:50',
            'password' => 'required|max:50|confirmed',
            'password_confirmation' => 'required|max:50',
            'email' => 'required|max:50|email'
        ]);

        $validator->after(function($validator) use($request) {
            $usernameCount = DB::table('users')->where('username', '=', $request->input('username'))->count();
            if ($usernameCount > 0) {
                $validator->errors()->add('username', 'Tên đăng nhập đã tồn tại.');
            }

            $emailCount = DB::table('users')->where('email', '=', $request->input('email'))->count();
            if ($emailCount > 0) {
                $validator->errors()->add('email', 'Email đã tồn tại.');
            }
        });

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $user = new User();
        $user->username = $request->input('username');
        $user->password = bcrypt($request->input('password'));
        $user->email = $request->input('email');

        $adminCount = DB::table('users')->where('admin', '=', true)->count();
        if ($adminCount < 1) {
            $user->admin = true;
        }

        $user->save();

        return response($user, Response::HTTP_OK);
    }
}
