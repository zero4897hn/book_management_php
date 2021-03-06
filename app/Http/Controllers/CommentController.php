<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $comment = new Comment();
        $comment->title = $request->input('title');
        $comment->content = $request->input('content');
        $comment->book_id = $request->input('book_id');

        $user = Auth::user();

        $comment->user_id = $user->id;
        $comment->save();

        $book = $comment->book;
        $book->comment_count = $book->comment_count + 1;
        $book->save();

        $comment->username = $user->username;
        $comment->userAvatar = $user->avatar;

        return response($comment, Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comment = Comment::find($id);
        return response($comment, Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

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
        $comment = Comment::find($id);
        $comment->title = $request->input('title');
        $comment->content = $request->input('content');
        $comment->save();

        $user = $comment->user;
        $comment->username = $user->username;
        $comment->userAvatar = $user->avatar;

        return response($comment, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = Comment::find($id);

        $book = $comment->book;
        $book->comment_count = $book->comment_count - 1;
        $book->save();

        $comment->delete();

        return response(null, Response::HTTP_OK);
    }
}
