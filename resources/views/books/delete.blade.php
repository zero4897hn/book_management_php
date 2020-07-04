<div class="modal fade" id="confirm-delete-book-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form method="POST" action="users/unblock">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xóa sách</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @csrf
                    <input type="hidden" id="field_book_id" />
                    <p>Xác nhận xóa sách này?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary" id="button_delete_book">Xóa</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery('#confirm-delete-book-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var bookId = button.data('id');
        var modal = $(this);
        modal.find('#field_book_id').val(bookId);
    });
    jQuery('button#button_delete_book').click(function(event) {
        event.preventDefault();

        var bookId = jQuery('input#field_book_id').val();

        jQuery.ajax({
            url: '/books/' + bookId,
            type: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            },
            success: function(data) {
                location.reload();
            },
            error: function(jqXHR, status) {
                console.log(jqXHR, status)
            }
        });
    });
});
</script>
