import { SHOW_TOAST } from "../utils/actions";

const toastActions = {}

toastActions.showToast = (data) => (dispatch) => {
    dispatch({ type: SHOW_TOAST, payload: { ...data } })
}

export default toastActions;
