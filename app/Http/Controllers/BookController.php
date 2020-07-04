<?php

namespace App\Http\Controllers;

use App\Book;
use Facade\FlareClient\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = DB::table('books')
            ->join('users', 'users.id', '=', 'books.user_id')
            ->select('users.id as id', 'name', 'cover', 'author', 'rating', 'comment_count', 'username')
            ->paginate(5);
        return View('books.list', compact('books'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return View('books.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $book = new Book();
        $book->name = $request->input('name');
        $book->isbn = $request->input('isbn');
        $book->author = $request->input('author');
        $book->publisher = $request->input('publisher');
        $book->editor = $request->input('editor');
        $book->description = $request->input('description');
        $book->user_id = Auth::user()->id;

        if ($coverFile = $request->file('coverFile')) {
            $coverFileName = $coverFile->getClientOriginalName();
            $coverFile->move('files/covers', $coverFileName);
            $book->cover = $coverFileName;
        }

        $book->save();
        return redirect('/books/'.$book->id)->with('status', 'Tạo sách thành công.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $book = Book::find($id);
        return View('books.detail', compact('book'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $book = Book::find($id);
        return View('books.edit', compact('book'));
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
        $book = Book::find($id);
        $book->name = $request->input('name');
        $book->isbn = $request->input('isbn');
        $book->author = $request->input('author');
        $book->publisher = $request->input('publisher');
        $book->editor = $request->input('editor');
        $book->description = $request->input('description');
        $book->user_id = Auth::user()->id;

        if ($coverFile = $request->file('coverFile')) {
            $coverFileName = $coverFile->getClientOriginalName();
            $coverFile->move('files/covers', $coverFileName);
            $book->cover = $coverFileName;
        }

        $book->save();
        return redirect('/books/'.$book->id)->with('status', 'Cập nhật sách thành công.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::delete('delete from books where id = ?', [$id]);
    }
}
