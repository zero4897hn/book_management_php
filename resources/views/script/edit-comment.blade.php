<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery('button.edit-comment').click(function(event) {
        var modal = jQuery('div#modal-edit-comment');
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
        var parentElement = jQuery(this).closest('div.custom-comment');
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
});
</script>
