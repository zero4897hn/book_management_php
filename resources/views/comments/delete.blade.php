<div class="modal fade" id="confirm-delete-comment-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form method="POST" action="users/unblock">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xóa bình luận</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @csrf
                    <input type="hidden" id="field_comment_id" />
                    <p>Xác nhận xóa bình luận này?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary" id="button_delete_comment">Xóa</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery('#confirm-delete-comment-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var commentId = button.data('id');
        var modal = $(this);
        modal.find('#field_comment_id').val(commentId);
    });
    jQuery('button#button_delete_comment').click(function(event) {
        event.preventDefault();

        var commentId = jQuery('input#field_comment_id').val();

        jQuery.ajax({
            url: '/comments/' + commentId,
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
