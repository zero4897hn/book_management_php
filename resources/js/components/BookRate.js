import React, { useState } from 'react';
import Border from './Border';
import { isEmpty } from 'lodash';
import Rating from 'react-rating';

const BookRate = (props) => {
    const [starValue, setStarValue] = useState(0);

    const { book } = props

    if (isEmpty(book)) return null;

    const onClickRating = (event) => {
        console.log(starValue);
    }

    return (
        <Border>
            <div className="col-sm-12">
                <h2>Đánh giá</h2>
            </div>
            <div className="col-sm-12">
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
                <div className="row">
                    <div className="col-md-2">Tổng đánh giá:</div>
                    <div className="col-md-10">{book.rating}</div>
                </div>
            </div>
        </Border>
    );
}

export default BookRate;
