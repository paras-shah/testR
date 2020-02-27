import {
    SIGN_IN,
    SIGN_OUT,
    MAGIC_LINK_SENT,
    RESET_ERROR,
    SIGN_UP_ERROR
} from "../actions";
const INITIAL_STATE = {
    username: null,
    isAuthenticated: false,
    errorMessage: null
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                username: action.payload.username,
                isAuthenticated: true,
                errorMessage: null
            };
        case SIGN_OUT:
            return {
                ...state,
                username: null,
                isAuthenticated: false,
                errorMessage: modifyErrorMessage(action.payload.message)
            };
        case MAGIC_LINK_SENT:
            return {
                ...state,
                username: null,
                isAuthenticated: false,
                errorMessage: modifyErrorMessage(action.payload.message)
            };
        case SIGN_UP_ERROR:
            return {
                ...state,
                username: null,
                isAuthenticated: false,
                errorMessage: modifyErrorMessage(action.payload.message)
            };
        case RESET_ERROR:
            return {
                ...state,
                errorMessage: null
            };
        default:
            return { ...state };
    }
};

function modifyErrorMessage(message) {
    const simpleMessage = (message === "timeout of 10000ms exceeded") ? "Timeout Error" :
        (message === "Request failed with status code 500") ? "Error" : message;
    console.log(simpleMessage);
    return simpleMessage;
}