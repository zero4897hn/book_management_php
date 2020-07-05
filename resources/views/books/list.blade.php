@extends('layouts.app')

@section('content')

<?php
    $sort = app('request')->input('sort');
    $sortField = '';
    $sortType = '';
    if (isset($sort)) {
        $sortData = explode(',', $sort);
        $sortField = $sortData[0];
        if (count($sortData) > 1) {
            $sortType = $sortData[1];
        }
    }
?>

<form id="searchForm" method="GET" action="/books">
    @csrf
    <input type="hidden" name="sort" id="searchField_sort" value="{{ $sort }}" />
    <div class="row">
        <div class="col-md-2">
            <label class="col-form-label" for="searchField_name">Tên sách</label>
        </div>
        <div class="col-md-4">
            <input
                type="text"
                class="form-control"
                name="name"
                id="searchField_name"
                value="{{ app('request')->input('name') }}"
            />
        </div>
        <div class="col-md-2">
            <label class="col-form-label" for="searchField_author">Tác giả</label>
        </div>
        <div class="col-md-4">
            <input
                type="text"
                class="form-control"
                name="author"
                id="searchField_author"
                value="{{ app('request')->input('author') }}"
            />
        </div>
    </div>
    <div class="row justify-content-center mt-2">
        <div class="col-4 d-flex justify-content-center">
            <button class="btn btn-info" type="submit">Tìm kiếm</button>
        </div>
    </div>
</form>
<div class="row mt-3">
    <div class="col-12">
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col" style="width: 5%">#</th>
                    <th scope="col" style="width: 10%">Bìa sách</th>
                    <th scope="col" style="width: 30%">Tên sách</th>
                    <th scope="col" style="width: 18%">Tác giả</th>
                    <th scope="col" style="width: 10%">Người đăng</th>
                    <th scope="col" style="width: 15%">
                        <span>Lượt bình luận</span>
                        <button
                            class="btn btn-sm btn-outline-secondary button-sort-book"
                            @if ($sortField == 'comment_count')
                            data-sort-field="comment_count"
                            data-sort-type="{{$sortType}}"
                            @else
                            data-sort-field="comment_count"
                            data-sort-type=""
                            @endif
                        >
                            @if ($sortField == 'comment_count')
                                @if ($sortType == 'desc')
                                <i class="fas fa-sort-down"></i>
                                @else
                                <i class="fas fa-sort-up"></i>
                                @endif
                            @else
                            <i class="fas fa-sort"></i>
                            @endif
                        </button>
                    </th>
                    <th scope="col" style="width: 12%">
                        <span>Đánh giá</span>
                        <button
                            class="btn btn-sm btn-outline-secondary button-sort-book"
                            @if ($sortField == 'rating')
                            data-sort-field="rating"
                            data-sort-type="{{$sortType}}"
                            @else
                            data-sort-field="rating"
                            data-sort-type=""
                            @endif
                        >
                            @if ($sortField == 'rating')
                                @if ($sortType == 'desc')
                                <i class="fas fa-sort-down"></i>
                                @else
                                <i class="fas fa-sort-up"></i>
                                @endif
                            @else
                            <i class="fas fa-sort"></i>
                            @endif
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <?php $index = 1; ?>
                @foreach ($books as $book)
                <tr>
                    <th scope="row">{{ ($books->currentPage() - 1) * $books->perPage() + $index }}</th>
                    <td><img class="img-fluid" src="{{ asset('files/covers/' . $book->cover) }}" /></td>
                    <td><a href="/books/{{ $book->id }}">{{$book->name}}</a></td>
                    <td>{{$book->author}}</td>
                    <td>{{$book->username}}</td>
                    <td>{{$book->comment_count}}</td>
                    <td>{{$book->rating}}</td>
                </tr>
                <?php $index++; ?>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

{{ $books->onEachSide(5)->links() }}
@endsection

@section('footer')
<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery('button.button-sort-book').click(function(event) {
        var button = $(this);
        var sortField = button.data('sort-field');
        var sortType = button.data('sort-type');

        jQuery('input#searchField_sort').val(sortField + ',' + (sortType === 'desc'? 'asc' : 'desc'));
        jQuery('#searchForm').submit();
    });
});
</script>
@endsection
