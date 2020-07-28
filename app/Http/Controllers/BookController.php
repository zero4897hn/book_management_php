<?php

namespace App\Http\Controllers;

use App\Book;
use App\Comment;
use App\Rate;
use Facade\FlareClient\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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
        $sort = $request->input('sort');

        $books = DB::table('books')
            ->join('users', 'users.id', '=', 'books.user_id')
            ->select('books.id as id', 'name', 'cover', 'author', 'rating', 'comment_count', 'username')
            ->whereNull('deleted_at')
            ->when($name, function ($query, $name) {
                return $query->whereRaw("UPPER(name) LIKE '%" . strtoupper($name) . "%'");
            })
            ->when($author, function($query, $author) {
                return $query->whereRaw("UPPER(author) LIKE '%" . strtoupper($author) . "%'");
            })
            ->when($sort, function($query, $sort) {
                $sortData = explode(',', $sort);
                if (count($sortData) < 2) {
                    return $query->orderBy('id', 'asc');
                } else {
                    if ($sortData[1] == 'desc') {
                        return $query->orderBy($sortData[0], 'desc');
                    } else {
                        return $query->orderBy($sortData[0], 'asc');
                    }
                }
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

        $validator->after(function($validator) use($request) {
            $countIsbn = DB::table('books')->where('isbn', '=', $request->input('isbn'))->count();
            if ($countIsbn > 0) {
                $validator->errors()->add('isbn', 'Mã cuốn sách đã tồn tại.');
            }
            if (!$request->file('coverFile')) {
                $validator->errors()->add('coverFile', 'Sách phải có ảnh bìa.');
            }
        });

        if ($validator->fails()) {
            throw new ValidationException($validator);
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
        }

        $book->save();
        return response($book, Response::HTTP_OK);
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
            'currentUser' => Auth::user(),
            'currentUserRating' => Rate::where(['book_id' => $id, 'user_id' => Auth::id()])->first()
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

        $validator->after(function($validator) use($request) {
            $countIsbn = DB::table('books')->where('isbn', '=', $request->input('isbn'))->count();
            if ($countIsbn > 0) {
                $validator->errors()->add('isbn', 'Mã cuốn sách đã tồn tại.');
            }
        });

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
        return response($book, Response::HTTP_OK);
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
        return response(null, Response::HTTP_OK);
    }
}
