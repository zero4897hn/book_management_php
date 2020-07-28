import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Toast = (props) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const { toastReducer } = props;
    const { successResponse } = toastReducer;

    useEffect(() => {
        if (successResponse) {
            setMessage(successResponse.message);
            setOpen(true);
        }
    }, [successResponse])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">{message}</Alert>
        </Snackbar>
    )
}

const mapStateToProps = (state) => ({
    toastReducer: state.toastReducer
})

export default connect(mapStateToProps)(Toast);
