import React from "react";
import ReactDOM from "react-dom";
//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//material ui
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

//Custom
//reducers
import reducers from "./reducers";
//Custom
import Themes from "./themes";
import App from "./components/App";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={Themes.basic}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </Provider>,

    document.getElementById("root")
);
