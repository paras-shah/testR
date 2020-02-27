import {
    // GET_HELP,
    // GET_HELP_ERROR,
    RESET_NOTIFICATION,
    NOTIFY_MESSAGE
} from "../actions";

const INITIAL_STATE = {
    message: null,
    messageType: null
};

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    const { message, messageType } = payload && payload.message ? payload : { message: '', messageType: '' };

    /// console.log(messageType);

    switch (type) {
        case NOTIFY_MESSAGE:
            return {
                ...state,
                message: message,
                messageType
            };
        case RESET_NOTIFICATION:
            return {
                ...state,
                message: null,
                messageType: null
            };

        // case GET_HELP:
        //     return {
        //         ...state,
        //         message: message,
        //         type: messageType
        //     };
        // case GET_HELP_ERROR:
        //     return {
        //         ...state,
        //         message: message,
        //         type: messageType
        //     };

        default:
            return { ...state };
    }
};
