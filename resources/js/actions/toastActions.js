import { SHOW_SUCCESS_TOAST } from "../utils/actions";

const toastActions = {}

toastActions.showSuccessToast = (data) => (dispatch) => {
    dispatch({ type: SHOW_SUCCESS_TOAST, payload: { ...data } })
}

export default toastActions;
