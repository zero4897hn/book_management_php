<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery('button#button_comment').click(function(event) {
        event.preventDefault();
        jQuery.ajax({
            url: '/comments',
            type: 'POST',
            dataType: 'json',
            data: {
                title: jQuery('input#field_title').val(),
                content: jQuery('textarea#field_content').val(),
                bookId: jQuery('input#field_bookId').val()
            },
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            },
            success: function(data) {
                jQuery('.no-one-comment').remove();
                var avatarUrl = '{{ URL::asset('files/avatars') }}';
                var commentField = `
                    <div class="row custom-comment">
                        <div class="col-sm-2">
                            <img class="img-fluid img-thumbnail" src="${
                                data.user_avatar !== null?
                                avatarUrl + '/' + data.user_avatar : avatarUrl + '/' + 'anonymous_avatar.png'
                            }" />
                            <h5 class="text-center">${data.username}</h5>
                        </div>
                        <div class="col-sm-10">
                            <input class="comment-id" type="hidden" value="${data.id}" />
                            <div class="card">
                                <div class="card-header">
                                    <span class="comment-title">${data.title}</span>
                                    <div class="float-right">
                                        <button
                                            class="btn btn-outline-secondary btn-sm edit-comment"
                                            data-toggle="modal"
                                            data-target="#modal-edit-comment"
                                        >
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button
                                            class="btn btn-outline-danger btn-sm"
                                            data-id="${data.id}"
                                            data-toggle="modal"
                                            data-target="#confirm-delete-comment-modal"
                                        >
                                            <i class="far fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body comment-content">${data.content}</div>
                            </div>
                        </div>
                    </div>
                `;
                jQuery('div#field_comment').append(commentField);
                jQuery('input#field_title').val('');
                jQuery('textarea#field_content').val('');
            }
        });
    });
});
</script>
