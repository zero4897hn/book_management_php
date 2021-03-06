import React, { useState, useEffect, useRef } from 'react';

const BookForm = (props) => {
    const [name, setName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [editor, setEditor] = useState('');
    const [description, setDescription] = useState('');
    const [cover, setCover] = useState(null);

    const fileInput = useRef(null);

    const { entity, handleSubmitForm = () => { }, errors = {}, disabledSubmit = false } = props;

    useEffect(() => {
        if (entity) {
            const { name, isbn, author, publisher, editor, description, cover } = { ...entity }
            setName(name || '');
            setIsbn(isbn || '');
            setAuthor(author || '');
            setPublisher(publisher || '');
            setEditor(editor || '');
            setDescription(description || '');
            setCover(cover || '');
        }
    }, [entity])

    const onSubmitForm = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('isbn', isbn);
        formData.append('author', author);
        formData.append('publisher', publisher);
        formData.append('editor', editor);
        formData.append('description', description);
        formData.append('cover', cover);
        if (fileInput.current.files.length) {
            formData.append('coverFile', fileInput.current.files[0]);
        }
        handleSubmitForm(event, formData);
    }

    return (
        <div className="row justify-content-sm-center">
            <div className="col-sm-10">
                <form onSubmit={event => onSubmitForm(event)}>
                    <div className="form-group">
                        <label htmlFor="field_name">Tên cuốn sách</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_name"
                            name="name"
                            maxLength="50"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.name && errors.name[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_isbn">Mã cuốn sách</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_isbn"
                            name="isbn"
                            maxLength="50"
                            value={isbn}
                            onChange={event => setIsbn(event.target.value)}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.isbn && errors.isbn[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_author">Tác giả</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_author"
                            name="author"
                            maxLength="50"
                            value={author}
                            onChange={event => setAuthor(event.target.value)}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.author && errors.author[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_publisher">Nhà xuất bản</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_publisher"
                            name="publisher"
                            maxLength="50"
                            value={publisher}
                            onChange={event => setPublisher(event.target.value)}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.publisher && errors.publisher[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_editor">Nhà biên tập</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_editor"
                            name="editor"
                            maxLength="50"
                            value={editor}
                            onChange={event => setEditor(event.target.value)}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.editor && errors.editor[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_description">Mô tả cuốn sách</label>
                        <textarea
                            className="form-control"
                            id="field_description"
                            name="description"
                            rows="5"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        ></textarea>
                        <div className="text-danger" role="alert">
                            {errors && errors.description && errors.description[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_cover">Bìa sách</label>
                        {cover
                            && <img className="img-fluid" style={{ maxWidth: '200px' }} src={`/files/covers/${cover}`} />}
                        <input
                            type="file"
                            className="form-control-file"
                            id="field_cover"
                            name="coverFile"
                            ref={fileInput}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.cover && errors.cover[0]}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={disabledSubmit}>Giới thiệu</button>
                </form>
            </div>
        </div>
    );
}

export default BookForm;
