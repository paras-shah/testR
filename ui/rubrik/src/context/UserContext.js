import React, { useReducer } from "react";
import { WEBPAGE_URL, API_URL } from "../apis/config";
import coreApiAxios from "../apis/coreapi";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, isAuthenticated: true };
        case "SIGN_OUT_SUCCESS":
            return { ...state, isAuthenticated: false };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function UserProvider({ children }) {
    var [state, dispatch] = useReducer(userReducer, {
        isAuthenticated: !!localStorage.getItem("id_token"),
    });

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

function useUserState() {
    var context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
}

function useUserDispatch() {
    var context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}

export {
    UserStateContext,
    UserProvider,
    useUserState,
    useUserDispatch,
    loginUser,
    signOut
};

// ###########################################################

async function loginUser(
    dispatch,
    login,
    password,
    history,
    setIsLoading,
    setError
) {
    setError(false);
    setIsLoading(true);

    if (!!login && !!password) {
        const axiosClient = coreApiAxios(login, password);
        await axiosClient
            .get(API_URL.USER)
            .then(function(result) {
                loginSuccess(
                    dispatch,
                    history,
                    setError,
                    setIsLoading,
                    login,
                    password
                );
            })
            .catch(function(error) {
                loginFaillure(dispatch, setError, setIsLoading);
            });
    }
}

function loginSuccess(
    dispatch,
    history,
    setError,
    setIsLoading,
    login,
    password
) {
    // dispatch will unmounted the login component so call setState functions before
    localStorage.setItem("id_token", 1);
    setIsLoading(false);
    dispatch({ type: "LOGIN_SUCCESS" });
}

function loginFaillure(dispatch, setError, setIsLoading) {
    localStorage.removeItem("id_token");
    setError(true);
    setIsLoading(false);
}

function signOut(dispatch, history) {
    localStorage.removeItem("id_token");
    localStorage.removeItem("auth");
    dispatch({ type: "SIGN_OUT_SUCCESS" });
    history.push(WEBPAGE_URL.LOGIN);
}