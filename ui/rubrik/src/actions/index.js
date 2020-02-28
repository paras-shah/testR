// CUSTOM
import axiosJwtTokenAPI from "../apis/coreapi";
// CONFIG
import {
    API_URL,
    WEBPAGE_URL,
    LAB_STATUS,
    LOCAL_STORAGE,
    RESPONSE
} from "../apis/config";

import history from "../history";
// COPY
import { COPY_FORM } from "../copy/common";

export const SELECT_VIRTUAL_DATA_UNIT = "SELECT_VIRTUAL_DATA_UNIT";
export const FETCH_VIRTUAL_DATA_UNITS = "FETCH_VIRTUAL_DATA_UNITS";
export const FETCH_VDU_TEMPLATES = "FETCH_VDU_TEMPLATES";
export const FETCH_VDU_MY_LABS = "FETCH_VDU_MY_LABS";
export const FETCH_MY_SPECIFIC_LAB = "FETCH_MY_SPECIFIC_LAB";

export const CREATE_LAB = "CREATE_LAB";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";
export const MAGIC_LINK_SENT = "MAGIC_LINK_SENT";

export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const VDU_SEARCH = "VDU_SEARCH";
export const RESET_ERROR = "RESET_ERROR";


export const NOTIFY_MESSAGE = "NOTIFY_MESSAGE";

export const NOTIFICATION_ERROR = "NOTIFICATION_ERROR";
export const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS";


export const GET_HELP = "GET_HELP";
export const GET_HELP_ERROR = "GET_HELP_ERROR";
export const RESET_NOTIFICATION = "RESET_NOTIFICATION";
export const MODULE_GET_HELP = "MODULE_GET_HELP";

/*
    Type: Location Action Creators
    Params: 
    Return: 
    Functionality: To update Locations in redux
*/

export function fetchVirtualDataUnitAction(isAuthenticated, vduId = null, pageUrl) {
    const axiosClient = axiosJwtTokenAPI(isAuthenticated);

    return async dispatch => {
        await axiosClient
            .get(API_URL.LAB_VDU)
            .then(function ({ data }) {
                if (data.hasOwnProperty("results")) {
                    let virtualDataUnits = [],
                        selectedVirtualDataUnit = "",
                        vduSelectedExist = null;

                    if (data.results.length) {
                        virtualDataUnits = data.results.map(virtualDataUnit => {
                            return {
                                id: virtualDataUnit.id,
                                name: virtualDataUnit.name
                            };
                        });

                        // If vdu comes in url take it from there else check for browser storage
                        if (vduId)
                            selectedVirtualDataUnit = vduId;
                        else {
                            selectedVirtualDataUnit = localStorage.getItem(
                                LOCAL_STORAGE.SELECTED_VDU
                            );
                        }

                        // verify if value we get in url/browser exist in values
                        if (selectedVirtualDataUnit) {
                            vduSelectedExist = virtualDataUnits.filter((currentValue, index) => {
                                return (currentValue.id === selectedVirtualDataUnit);
                            });
                        }

                        if (vduSelectedExist) {
                            selectedVirtualDataUnit =
                                vduSelectedExist[0].id;
                        } else {
                            selectedVirtualDataUnit =
                                virtualDataUnits[0].id;
                        }

                        // if its not there on page load append it in url 
                        if (pageUrl.indexOf(WEBPAGE_URL.LABS) > -1) {
                            history.push(`${WEBPAGE_URL.LABS}/${selectedVirtualDataUnit}`);
                        } else if (pageUrl.indexOf(WEBPAGE_URL.MY_LABS) > -1) {
                            history.push(`${WEBPAGE_URL.MY_LABS}/${selectedVirtualDataUnit}`);
                        }

                        // update browser storage 
                        localStorage.setItem(
                            LOCAL_STORAGE.SELECTED_VDU,
                            selectedVirtualDataUnit
                        );

                        /* Add default label option for dropdown */
                        virtualDataUnits.unshift({
                            id: "",
                            name: COPY_FORM.SELECT_VDU
                        });

                        dispatch({
                            type: FETCH_VIRTUAL_DATA_UNITS,
                            payload: { virtualDataUnits, selectedVirtualDataUnit }
                        });
                    }
                }
            })
            .catch(function (error) {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Not able to fetch virtual data units.",
                    FETCH_VIRTUAL_DATA_UNITS,
                    { virtualDataUnits: [], selectedVirtualDataUnit: "" }
                );
            });
    };
}

/*
    Type: Location Action Creators
    Params: 
    Return: 
    Functionality: To update selected VDU in state 
*/
export function selectVirtualDataUnitAction(selectedVirtualDataUnit) {
    localStorage.setItem(LOCAL_STORAGE.SELECTED_VDU, selectedVirtualDataUnit);
    return dispatch => {
        dispatch({
            type: SELECT_VIRTUAL_DATA_UNIT,
            payload: { selectedVirtualDataUnit }
        });
    };
}

/*
    Type: Action Creators
    Params: selectedVirtualDataUnit - to select labs based on selectedVirtualDataUnit
    Return:  
*/
export const fetchLabTemplatesAction = (
    selectedVirtualDataUnit,
    searchTerm = null
) => {
    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.SESSION)
        ? true
        : false;
    const axiosClient = axiosJwtTokenAPI(isAuthenticated);

    let SEARCH_API_URL = !searchTerm
        ? API_URL.LAB_TEMPLATE_BY_VDU
        : `${API_URL.LAB_TEMPLATE_BY_VDU}?${API_URL.SEARCH_PARAM}=${searchTerm}`;

    return async dispatch => {
        await axiosClient
            .get(SEARCH_API_URL, {
                params: {
                    vdu_id: selectedVirtualDataUnit
                }
            })
            .then(({ data }) => {
                if (data.hasOwnProperty("results")) {
                    // if only vdu is selected
                    const payload = {
                        virtualDataUnitSpecific: data.results
                    };
                    dispatch({ type: FETCH_VDU_TEMPLATES, payload });
                }
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Not able to fetch templates.",
                    FETCH_VDU_TEMPLATES,
                    {
                        virtualDataUnitSpecific: []
                    }
                );
            });
    };
};

/*
    Type: Action Creators
    Params: client - to make core API calls
    Return:  
*/
export const createLabAction = formValues => {
    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.SESSION)
        ? true
        : false;
    const axiosClient = axiosJwtTokenAPI(isAuthenticated);

    return async dispatch => {
        const params = formValues;

        await axiosClient
            .post(API_URL.LAB_INSTANCE, {
                lab_template: formValues.lab_template,
                params: params
            })
            .then(response => {
                const selectedVirtualDataUnit = localStorage.getItem(
                    LOCAL_STORAGE.SELECTED_VDU
                );
                history.push(`${WEBPAGE_URL.MY_LABS}/${selectedVirtualDataUnit}`);
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Not able to create a lab.",
                    NOTIFY_MESSAGE
                );
            });
    };
};

/*
    Type: Action Creators
    Params: selectedVirtualDataUnit - 
    Return:  
*/
export const fetchMyLabsAction = (
    selectedVirtualDataUnit,
    searchTerm = null
) => {
    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.SESSION)
        ? true
        : false;
    const axiosClient = axiosJwtTokenAPI(isAuthenticated);

    let SEARCH_API_URL = !searchTerm
        ? API_URL.LAB_INSTANCE
        : `${API_URL.LAB_INSTANCE}?${API_URL.SEARCH_PARAM}=${searchTerm}`;

    return async dispatch => {
        await axiosClient
            .get(SEARCH_API_URL, {
                params: {
                    vdu_id: selectedVirtualDataUnit
                }
            })
            .then(({ data }) => {
                if (data.hasOwnProperty("results")) {
                    const payload = {
                        virtualDataUnitInstances: data.results
                    };
                    dispatch({ type: FETCH_VDU_MY_LABS, payload });
                }
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Not able to fetch labs instance",
                    FETCH_VDU_MY_LABS,
                    {
                        virtualDataUnitInstances: [],
                        specificLab: null
                    }
                );
            });
    };
};

/*
    Type: Action Creators
    Params: labId - 
    Return:  
*/
export const fetchMySpecificLabAction = labId => {
    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.SESSION)
        ? true
        : false;
    const axiosClient = axiosJwtTokenAPI(isAuthenticated);

    return dispatch => {
        axiosClient
            .get(`${API_URL.LAB_INSTANCE}${labId}`)
            .then(({ data }) => {
                if (data.hasOwnProperty("id")) {
                    dispatch({
                        type: FETCH_MY_SPECIFIC_LAB,
                        payload: {
                            specificLab: data
                        }
                    });
                }
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Not able to fetch lab",
                    FETCH_MY_SPECIFIC_LAB, {
                    specificLab: null
                }
                );
            });
    };
};

/*
    Type: Action Creators
    Params: client - to make core API calls
    Return:  
*/
export const deleteMyLabAction = (
    templateInstanceID,
    selectedVirtualDataUnit,
    searchTerm = null
) => {
    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.SESSION)
        ? true
        : false;
    const axiosClient = axiosJwtTokenAPI(isAuthenticated);

    return async dispatch => {
        await axiosClient
            .put(`${API_URL.DELETE_LAB_INSTANCE}/${templateInstanceID}/`)
            .then(response => {
                dispatch(
                    fetchMyLabsAction(selectedVirtualDataUnit, searchTerm)
                );
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Error in deleting lab.",
                    NOTIFY_MESSAGE
                );
            });
    };
};

/*
    Type: Function
    Params: Lab instances of a specific user
    Return: Number of new labs 
    */
export function checkForNewMyLabs(myLabs) {
    let newLabs;
    if (
        myLabs.virtualDataUnitInstances &&
        myLabs.virtualDataUnitInstances.length
    ) {
        newLabs = myLabs.virtualDataUnitInstances.filter(lab => {
            return (
                lab.status.toLowerCase() === LAB_STATUS.INITIAL.toLowerCase() ||
                lab.status.toLowerCase() === LAB_STATUS.PROCESSING.toLowerCase()
            );
        });
    } else newLabs = [];

    return newLabs.length;
}

/* Type: 
Params: 
Return: 
Functionality: 
*/
export function toggleSidebarAction(currentLayoutState) {
    return dispatch => {
        dispatch({
            type: TOGGLE_SIDEBAR,
            payload: { currentLayoutState: !currentLayoutState }
        });
    };
}

/* Type: 
Params: 
Return: 
Functionality: 
*/
export function signInAction(username, password) {
    // const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.SESSION) ? true : false;
    const axiosClient = axiosJwtTokenAPI(false);
    return async dispatch => {
        await axiosClient
            .post(API_URL.LOGIN_API, {
                username: username,
                password: password
            })
            .then(({ data }) => {
                localStorage.removeItem(LOCAL_STORAGE.SELECTED_VDU);
                localStorage.setItem(LOCAL_STORAGE.SESSION, data.token);
                localStorage.setItem(
                    LOCAL_STORAGE.USERNAME,
                    data.user.username
                );

                dispatch({
                    type: SIGN_IN,
                    payload: {
                        username: data.user.username,
                        isAuthenticated: true,
                        message: null
                    }
                });
                history.push(WEBPAGE_URL.PAGE_LANDING_URL);
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Sign In Error",
                    SIGN_OUT,
                    true

                );
            });
    };
}

/* Type: 
Params: 
Return: 
Functionality: 
*/
export function signUpAction(email, eventCode) {
    // const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.SESSION) ? true : false;
    const axiosClient = axiosJwtTokenAPI(false);
    let errorMessage ='';
    return async dispatch => {
        await axiosClient
            .post(API_URL.EVENT_REGISTRATION_API, {
                email: email,
                invite_code: eventCode
            })
            .then(({ data }) => {
                if(data.hasOwnProperty("register") &&  data.register ){
                    errorMessage = `${data.email} - ${data.message}. Please go to RCF site by clicking the Rubrik logo. Thanks!` 
                }else{
                    errorMessage = `${data.message}`; 
                }
                
                dispatch({
                    type: SIGN_OUT,
                    payload: {
                        message: errorMessage
                    }
                });
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Event Sign Up Error",
                    SIGN_UP_ERROR,
                    true
                );
            });
    };
}

/* Type: 
Params: 
Return: 
Functionality: 
*/
export function magicLinkAction(email) {
    const axiosClient = axiosJwtTokenAPI(false);
    return async dispatch => {
        await axiosClient
            .post(API_URL.MAGIC_LINK_API, {
                username: email
            })
            .then(({ data }) => {
                dispatch({
                    type: MAGIC_LINK_SENT,
                    payload: {
                        message: data.message
                    }
                });
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Magic Link Sent",
                    MAGIC_LINK_SENT,
                    true
                );
            });
    };
}

/* Type: 
Params: 
Return: 
Functionality: 
*/
export function signOutAction() {
    return dispatch => {
        resetLocalStorage();
        dispatch({
            type: SIGN_OUT,
            payload: {
                message: "Sign out successfully"
            }
        });
        history.push(WEBPAGE_URL.LOGIN);
    };
}

export function resetLocalStorage() {
    localStorage.removeItem(LOCAL_STORAGE.SESSION);
    localStorage.removeItem(LOCAL_STORAGE.SELECTED_VDU);
    localStorage.removeItem(LOCAL_STORAGE.USERNAME);
    localStorage.removeItem(LOCAL_STORAGE.REDIRECT_URL);
}

/* Type: 
Params: 
Return: 
Functionality: 
*/
export function updateSearchTermAction(searchTerm = "") {
    return {
        type: VDU_SEARCH,
        payload: {
            searchTerm
        }
    };
}

/* Type: 
Params: 
Return: 
Functionality: 
*/
export function resetAuthErrorMessageAction() {
    return {
        type: RESET_ERROR
    };
}

/*
    Type: 
    Params: 
    Return: 
    Functionality:  To refresh token for another period 
    SS settings 
    'JWT_REFRESH_EXPIRATION_DELTA': 7 days,
    'JWT_EXPIRATION_DELTA': 1 days - so we refresh token for 1 day 
*/
export function validateTokenAction(magicToken) {
    const axiosClient = axiosJwtTokenAPI(false);
    return async dispatch => {
        await axiosClient
            .post(API_URL.TOKEN_REFRESH, {
                token: magicToken
            })
            .then(({ data }) => {
                // localStorage.removeItem(LOCAL_STORAGE.SELECTED_VDU);
                localStorage.setItem(LOCAL_STORAGE.SESSION, data.token);
                localStorage.setItem(
                    LOCAL_STORAGE.USERNAME,
                    data.user.username
                );

                dispatch({
                    type: SIGN_IN,
                    payload: {
                        username: data.user.username,
                        isAuthenticated: true,
                        message: null
                    }
                });
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Error in validating token",
                    SIGN_OUT,
                    true
                );
            });
    };
}

/*
    Type: Action Creators
    Params: client - to make core API calls
    Return:  
*/
export const getHelpAction = formValues => {
    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.SESSION)
        ? true
        : false;
    const axiosClient = axiosJwtTokenAPI(isAuthenticated);

    let formData = new FormData();
    formData.append("subject", formValues.subject);
    formData.append("message", formValues.message);
    formData.append("attachment", formValues.attachment);

    return async dispatch => {
        await axiosClient
            .post(API_URL.GET_HELP, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                dispatch({
                    type: GET_HELP,
                    payload: {
                        message: response.data.message,
                        type: "Success"
                    }
                });
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Not able to get help",
                    NOTIFY_MESSAGE
                );
            });
    };
};

/*
    Type: Action Creators
    Functionality: Reset  
    Params: client - to clear notifications
    Return:  
*/
export const clearNotificationAction = () => {
    return {
        type: RESET_NOTIFICATION
    };
};

/*
    Type: Action Creators
    Params: client - Tpo perform action on  lab instances 
    Return:  
*/
export const performLabActions = (
    actionType,
    actionName,
    labId,
    resourceId,
    formValues
) => {
    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE.SESSION)
        ? true
        : false;
    const axiosClient = axiosJwtTokenAPI(isAuthenticated);

    return async dispatch => {
        const params = formValues;

        await axiosClient
            .post(API_URL.PERFORM_LAB_ACTIONS, {
                type:actionType,
                name:actionName,
                instance_id: labId,
                resource_id:resourceId,
                params: params
            })
            .then(response => {
                    console.log(response);
            })
            .catch(error => {
                handleTryCatchError(
                    dispatch,
                    error,
                    "Not able to perform action",
                    NOTIFY_MESSAGE
                );
            });
    };
};

/*
    Type: Action Creators
    Params: 
    payload - if true works as a signoutflag otherwise 
        payload for other params
    Return:  
*/
function handleTryCatchError(
    dispatch,
    error,
    customErrorMessage = null,
    actionType,
    payload
) {
    //    console.log(error.config);
    let signOutFlag = false, errorMessage = customErrorMessage;
    signOutFlag = payload === true ? true : false;

    if (
        error &&
        error.hasOwnProperty("response") &&
        error.response !== undefined &&
        error.response.hasOwnProperty("status") &&
        error.response.status !== undefined &&
        (error.response.status === RESPONSE.BAD_REQUEST ||
            error.response.status === RESPONSE.UNAUTHORIZED)
    ) {
        const response = error.response;
        errorMessage =
            response.data && response.data.non_field_errors
                ? response.data.non_field_errors[0]
                : response.data && response.data.message
                    ? response.data && response.data.message
                    : response.statusText;

        if (error.response.status === RESPONSE.UNAUTHORIZED)
            signOutFlag = true;

    } else if (
        error.request &&
        error.request.hasOwnProperty("statusText") &&
        error.request.statusText
    ) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorMessage = error.request.statusText;
    } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
    }

    if (errorMessage) {
        // console.log("Error", errorMessage);
        // throw new Error();

        // Login page error 
        if (customErrorMessage === "Magic Link Sent" ||
            customErrorMessage === "Event Sign Up Error" ||
            customErrorMessage === "Sign In Error") {
            dispatch({
                type: SIGN_OUT,
                payload: {
                    message: errorMessage
                }
            });
        }
        else if (signOutFlag) {
            resetLocalStorage();
            dispatch({
                type: SIGN_OUT,
                payload: {
                    message: errorMessage
                }
            });
            clearNotificationAction();
            history.push(WEBPAGE_URL.LOGIN);
        } else {
            if (actionType !== NOTIFY_MESSAGE) {
                dispatch({
                    type: actionType,
                    payload
                });
            }

            dispatch({
                type: NOTIFY_MESSAGE,
                payload: {
                    message: errorMessage,
                    messageType: NOTIFICATION_ERROR
                }
            });
        }
    }
}
