<div class="modal fade" id="confirm-block-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form method="POST" action="users/block">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Khóa tài khoản</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @csrf
                    <input type="hidden" name="user_id" id="field_user_id" />
                    <fieldset class="form-group">
                        <label for="field_ban_expired_at">Ngày mở khóa:</label>
                        <input
                            id="field_ban_expired_at"
                            type="date"
                            class="form-control"
                            placeholder="Nhập ngày mở khóa"
                            name="ban_expired_at"
                        />
                        <small>Nếu để trống và xác nhận khóa, tài khoản sẽ khóa vĩnh viễn đến khi mở</small>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary">Xác nhận khóa</button>
                </div>
            </form>
        </div>
    </div>
</div>
