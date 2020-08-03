import React, { useState, useEffect } from 'react';
import Border from './Border';
import Rating from 'react-rating';
import bookActions from '../actions/bookActions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const BookRate = (props) => {
    const [starValue, setStarValue] = useState(0);

    const { bookReducer, authenticationReducer, rateBook } = props;
    const { book, rateResponse } = bookReducer;
    const { isLogin } = authenticationReducer;
    const [isFirstRun, setFirstRun] = useState(true);

    useEffect(() => {
        if (book && book.current_rate && book.current_rate.rating) {
            setStarValue(book.current_rate.rating)
        } else {
            setStarValue(0);
        }
    }, [book])

    useEffect(() => {
        if (isFirstRun) {
            setFirstRun(false);
            return;
        }

        const { success } = rateResponse;
        if (success) {
            toast.success('Đánh giá thành công');
        }
    }, [rateResponse]);

    const onClickRating = () => {
        let rate = null;
        if (book.current_rate) {
            rate = { ...book.current_rate };
            rate.rating = starValue;
        } else {
            rate = {
                rating: starValue,
                book_id: book.id
            }
        }
        rateBook(rate);
    }

    return (
        <Border>
            <div className="col-sm-12">
                <h2>Đánh giá</h2>
            </div>
            <div className="col-sm-12">
                {isLogin &&
                    <div className="row">
                        <div className="col-md-2">Bản thân:</div>
                        <div className="col-md-10">
                            <Rating
                                start={0}
                                stop={5}
                                step={1}
                                initialRating={starValue}
                                onChange={(value) => setStarValue(value)}
                            // emptySymbol={() => <FaStarAndCrescent />}
                            // fullSymbol={() => <FaStar />}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={(event) => onClickRating(event)}
                            >Đánh giá</button>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-md-2">Tổng đánh giá:</div>
                    <div className="col-md-10">{book.rating}</div>
                </div>
            </div>
        </Border>
    );
}

const mapStateToProps = state => ({
    bookReducer: state.bookReducer,
    authenticationReducer: state.authenticationReducer,
})

const mapDispatchToProps = dispatch => ({
    rateBook: data => dispatch(bookActions.rateBook(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookRate);
