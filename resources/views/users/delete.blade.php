<div class="modal fade" id="confirm-delete-user-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form method="POST" action="users/unblock">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Khóa tài khoản</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @csrf
                    <input type="hidden" id="field_user_id" />
                    <p>Xác nhận xóa tài khoản này?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary">Xác nhận mở khóa</button>
                </div>
            </form>
        </div>
    </div>
</div>
