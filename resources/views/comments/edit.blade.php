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
                    <input type="hidden" id="editField_bookId" value="{{ $book->id }}" />
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

<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery('#modal-edit-comment').on('show.bs.modal', function (event) {
        var button = jQuery(event.relatedTarget);
        var modal = jQuery(this);
        var titleField = modal.find('input#editField_title');
        var contentField = modal.find('textarea#editField_content');
        var bookIdField = modal.find('input#editField_bookId');
        var submitButton = modal.find('button#button_update');

        titleField.val('');
        contentField.val('');
        bookIdField.val('');
        //  Disable the submit button until the data is gotten
        submitButton.prop('disabled', true);

        var commentElements = jQuery('.custom-comment');
        //  Get element planning to edit
        var parentElement = button.closest('div.custom-comment');
        //  Get id of comment
        var commentId = parentElement.find('input.comment-id').attr('value');
        //  Flag that we are planning to edit this element
        parentElement.addClass('comment-is-editing');
        //  Remove other flags
        commentElements.not(parentElement).removeClass('comment-is-editing');

        jQuery.ajax({
            url: '/comments/' + commentId,
            type: 'GET',
            success: function(data) {
                //  Now the data is gotten, enable the submit button.
                submitButton.prop('disabled', false);
                var modal = jQuery('div#modal-edit-comment');
                titleField.val(data.title);
                contentField.val(data.content);
                bookIdField.val(data.id);
            }
        });
    });
    jQuery('#modal-edit-comment').on('hidden.bs.modal', function (event) {
        jQuery('.custom-comment').removeClass('comment-is-editing');
    })
    jQuery('button#button_update').click(function(event) {
        event.preventDefault();

        var button = jQuery(this);
        button.prop('disabled', true);

        var bookId = jQuery('input#editField_bookId').val();

        jQuery.ajax({
            url: '/comments/' + bookId,
            type: 'PUT',
            dataType: 'json',
            data: {
                title: jQuery('input#editField_title').val(),
                content: jQuery('textarea#editField_content').val(),
            },
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            },
            success: function(data) {
                var editingElement = jQuery('.comment-is-editing');
                editingElement.find('.comment-title').html(data.title);
                editingElement.find('.comment-content').html(data.content);
                editingElement.removeClass('comment-is-editing');
                jQuery('#modal-edit-comment').modal('hide');
            },
            error: function(jqXHR, status) {
                console.log(jqXHR, status)
                button.prop('disabled', false);
            }
        });
    });
});
</script>
