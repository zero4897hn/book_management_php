<?php

namespace App\Http\Controllers;

use App\Book;
use Facade\FlareClient\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $books = Book::paginate(5);
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
        $book->category_id = 1;

        if ($coverFile = $request->file('coverFile')) {
            $coverFileName = $coverFile->getClientOriginalName();
            $coverFile->move('files/covers', $coverFileName);
            $book->cover = $coverFileName;
        }

        $book->save();
        return redirect('/books')->with('status', 'Tạo sách thành công.');
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
        //
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
        //
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
}
