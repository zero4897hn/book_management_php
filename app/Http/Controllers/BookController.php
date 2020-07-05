<?php

namespace App\Http\Controllers;

use App\Book;
use Facade\FlareClient\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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
    public function index(Request $request)
    {
        $name = $request->input('name');
        $author = $request->input('author');

        $books = DB::table('books')
            ->join('users', 'users.id', '=', 'books.user_id')
            ->select('books.id as id', 'name', 'cover', 'author', 'rating', 'comment_count', 'username')
            ->whereNull('deleted_at')
            ->when($name, function ($query, $name) {
                return $query->where('name', 'like', '%'. $name  .'%');
            })
            ->when($author, function($query, $author) {
                return $query->where('author', 'like', '%'. $author  .'%');
            })
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:50',
            'isbn' => 'required|max:50',
            'author' => 'required|max:50',
            'publisher' => 'required|max:50',
            'editor' => 'max:50',
        ]);

        if ($validator->fails()) {
            return redirect('/books/create')->withErrors($validator)->withInput();
        }

        $book = new Book();
        $book->name = $request->input('name');
        $book->isbn = $request->input('isbn');
        $book->author = $request->input('author');
        $book->publisher = $request->input('publisher');
        $book->editor = $request->input('editor');
        $book->description = $request->input('description');
        $book->user_id = Auth::id();

        if ($coverFile = $request->file('coverFile')) {
            $coverFileName = $coverFile->getClientOriginalName();
            $coverFile->move('files/covers', $coverFileName);
            $book->cover = $coverFileName;
        } else {
            return redirect('/books/create')->with('fileRequireError', 'Sách phải có ảnh bìa.');
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
        $data = [
            'book' => Book::find($id),
            'currentUserId' => Auth::id()
        ];
        return View('books.detail', $data);
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:50',
            'isbn' => 'required|max:50',
            'author' => 'required|max:50',
            'publisher' => 'required|max:50',
            'editor' => 'max:50',
        ]);

        if ($validator->fails()) {
            return redirect('/books/create')->withErrors($validator)->withInput();
        }

        $book = Book::find($id);
        $book->name = $request->input('name');
        $book->isbn = $request->input('isbn');
        $book->author = $request->input('author');
        $book->publisher = $request->input('publisher');
        $book->editor = $request->input('editor');
        $book->description = $request->input('description');
        $book->user_id = Auth::id();

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
        Book::find($id)->delete();
    }
}
