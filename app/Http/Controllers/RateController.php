<?php

namespace App\Http\Controllers;

use App\Book;
use App\Rate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RateController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function save(Request $request)
    {
        $id = $request->input('id');
        $rate = null;
        if (null !== $id) {
            $rate = Rate::find($id);
        } else {
            $rate = new Rate();
            $rate->user_id = Auth::id();
        }
        $rate->book_id = $request->input('book_id');
        $rate->rating = $request->input('rating');
        $rate->save();

        $book = Book::find($rate->book_id);

        $rates = $book->rates;

        $sum = 0;
        foreach ($rates as $rate) {
            $sum += $rate->rating;
        }
        $book->rating = $sum / count($rates);
        $book->save();

        return response([
            'rate' => $rate,
            'totalRating' => $book->rating
        ], Response::HTTP_OK);
    }
}
