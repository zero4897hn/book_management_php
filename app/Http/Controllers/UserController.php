<?php

namespace App\Http\Controllers;

use App\User;
use Facade\FlareClient\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
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
        // return $users;
        return View('users.list', compact('users'));
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

        if ($validator->fails()) {
            return redirect('users/create')->withErrors($validator)->withInput();
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
        return redirect('users/'.$user->id)->with('status', 'Thêm mới tài khoản thành công.');
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

        if ($validator->fails()) {
            return redirect('users/'. $id .'/edit')->withErrors($validator)->withInput();
        }

        $user = User::find($id);
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
        return redirect('users/'.$user->id)->with('status', 'Cập nhật tài khoản thành công.');
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
        return redirect('users');
    }

    public function unblock(Request $request)
    {
        $user = User::find($request->input('user_id'));
        $user->banned = false;
        $user->ban_expired_at = null;
        $user->save();
        return redirect('users');
    }
}
