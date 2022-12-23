import AuthService from "../services/api";

export const ActionType = {
    ADMINLOGIN_SUCCESS: 'ADMINLOGIN_SUCCESS',
    ADMINLOGIN_FAIL: 'ADMINLOGIN_FAIL',
    ADMIN_LOGOUT: 'ADMIN_LOGOUT',
    ADMINSET_MESSAGE: 'ADMINSET_MESSAGE'
}

export const adminlogin = (emailID, password) => (dispatch) => {
    return AuthService.adminlogin(emailID, password).then(
        (data) => {
            dispatch({
                type: ActionType.ADMINLOGIN_SUCCESS,
                payload: {user: data},
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ActionType.ADMINLOGIN_FAIL,
            });

            dispatch({
                type: ActionType.ADMINSET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const adminlogout = () => (dispatch) => {
    AuthService.adminlogout();

    dispatch({
        type: ActionType.ADMIN_LOGOUT,
    });

};