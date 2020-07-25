import React from 'react';
import Border from './Border';

const BookRate = () => {
    return (
        <Border>
            <div className="col-sm-12">
                <h2>Đánh giá</h2>
            </div>
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-md-2">Bản thân:</div>
                    <div className="col-md-10">
                        <i className="fas fa-star checked button-rating" style={{ cursor: 'pointer' }} data-value="{{ $i + 1 }}"></i>
                        <i
                            className="fas fa-star button-rating"
                            style={{ cursor: 'pointer' }}
                            data-value="{{ $i + $currentUserRating->rating + 1 }}"
                        ></i>
                        <form style={{ display: 'inline' }}>
                            <input type="hidden" name="id" value="{{$currentUserRating->id}}" />
                            <input type="hidden" name="book_id" value="{{$book->id}}" />
                            <input type="hidden" name="rating" id="field_rating" value="{{$currentUserRating->rating}}" />
                            <button className="btn btn-primary">Đánh giá</button>
                        </form>
                        <i className="fas fa-star button-rating" style={{ cursor: 'pointer' }} data-value="1"></i>
                        <i className="fas fa-star button-rating" style={{ cursor: 'pointer' }} data-value="2"></i>
                        <i className="fas fa-star button-rating" style={{ cursor: 'pointer' }} data-value="3"></i>
                        <i className="fas fa-star button-rating" style={{ cursor: 'pointer' }} data-value="4"></i>
                        <i className="fas fa-star button-rating" style={{ cursor: 'pointer' }} data-value="5"></i>
                        <form style={{ display: 'inline' }}>
                            <input type="hidden" name="book_id" value="{{$book->id}}" />
                            <input type="hidden" name="rating" id="field_rating" value="0" />
                            <button className="btn btn-primary">Đánh giá</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">Tổng đánh giá:</div>
                    <div className="col-md-10"></div>
                </div>
            </div>
        </Border>
    );
}

export default BookRate;
