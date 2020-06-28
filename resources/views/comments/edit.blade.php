<div
    class="modal fade"
    id="modal-edit-comment"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form>
                <div class="modal-header">
                    <h5 class="modal-title">Chỉnh sửa bình luận</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <fieldset class="form-group">
                        <label for="editField_title">Tiêu đề:</label>
                        <input
                            id="editField_title"
                            type="text"
                            class="form-control"
                            placeholder="Nhập tiêu đề"
                            name="title"
                            required
                        />
                    </fieldset>
                    <fieldset class="form-group">
                        <label for="editField_content">Nội dung:</label>
                        <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Nhập Nội dung"
                            id="editField_content"
                            name="content"
                            required
                        ></textarea>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="submit" id="button_update" class="btn btn-primary">Chỉnh sửa</button>
                </div>
            </form>
        </div>
    </div>
</div>
