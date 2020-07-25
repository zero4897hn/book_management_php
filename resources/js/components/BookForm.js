import React from 'react';

const BookForm = () => {
    return (
        <div className="row justify-content-sm-center">
            <div className="col-sm-10">
                <form>
                    <div className="form-group">
                        <label htmlFor="field_name">Tên cuốn sách</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_name"
                            name="name"
                            maxLength="50"
                            value="{{ old('name') }}"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_isbn">Mã cuốn sách</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_isbn"
                            name="isbn"
                            maxLength="50"
                            value="{{ old('isbn') }}"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_author">Tác giả</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_author"
                            name="author"
                            maxLength="50"
                            value="{{ old('author') }}"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_publisher">Nhà xuất bản</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_publisher"
                            name="publisher"
                            maxLength="50"
                            value="{{ old('publisher') }}"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_editor">Nhà biên tập</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_editor"
                            name="editor"
                            maxLength="50"
                            value="{{ old('editor') }}"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_description">Mô tả cuốn sách</label>
                        <textarea className="form-control" id="field_description" name="description" rows="5"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_cover">Bìa sách</label>
                        <input type="file" className="form-control-file" id="field_cover" name="coverFile" />
                    </div>
                    <button type="submit" className="btn btn-primary">Giới thiệu</button>
                </form>
            </div>
        </div>
    );
}

export default BookForm;
