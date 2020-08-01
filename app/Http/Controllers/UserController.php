<?php

namespace App\Http\Controllers;

use App\User;
use Facade\FlareClient\View;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
        $this->middleware('isAdmin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = DB::table('users')
            ->select('id', 'avatar', 'username', 'email', 'admin', 'banned')
            ->paginate(5);
        return response($users, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return View('users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|max:50',
            'password' => 'required|max:50',
            'email' => 'required|max:50|email',
            'first_name' => 'max:50',
            'last_name' => 'max:50'
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
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->admin = $request->input('admin');
        $user->password = $request->input('password');

        if ($avatarFile = $request->file('avatarFile')) {
            $avatarFileName = $avatarFile->getClientOriginalName();
            $avatarFile->move('files/avatars', $avatarFileName);
            $user->avatar = $avatarFileName;
        }

        $user->save();
        return response($user, Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return View('users.detail', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        return View('users.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|max:50',
            'email' => 'required|max:50|email',
            'first_name' => 'max:50',
            'last_name' => 'max:50'
        ]);

        $user = User::find($id);

        $validator->after(function($validator) use($request, $user) {
            $usernameCount = DB::table('users')->where('username', '=', $request->input('username'))->count();
            if ($usernameCount > 0) {
                $validator->errors()->add('username', 'Tên đăng nhập đã tồn tại.');
            }

            $emailCount = DB::table('users')->where('email', '=', $request->input('email'))->count();
            if ($emailCount > 0) {
                $validator->errors()->add('email', 'Email đã tồn tại.');
            }

            if ($user->admin && !$request->input('admin')) {
                $adminCount = DB::table('users')->where('admin', '=', true)->count();
                if ($adminCount < 2) {
                    $validator->errors()->add('admin', 'Còn duy nhất 1 tài khoản quản trị, không thể đổi.');
                }
            }
        });

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->admin = $request->input('admin');

        if ($avatarFile = $request->file('avatarFile')) {
            $avatarFileName = $avatarFile->getClientOriginalName();
            $avatarFile->move('files/avatars', $avatarFileName);
            $user->avatar = $avatarFileName;
        }

        $user->save();
        return response($user, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function block(Request $request)
    {
        $user = User::find($request->input('user_id'));
        $user->banned = true;
        if (null != $request->input('ban_expired_at')) {
            $user->ban_expired_at = $request->input('ban_expired_at');
        }
        $user->save();
        return response($user, Response::HTTP_OK);
    }

    public function unblock(Request $request)
    {
        $user = User::find($request->input('user_id'));
        $user->banned = false;
        $user->ban_expired_at = null;
        $user->save();
        return response($user, Response::HTTP_OK);
    }
}
