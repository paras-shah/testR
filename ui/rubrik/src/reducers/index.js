import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'

import labReducers from "./labsReducer";
import myLabsReducers from "./myLabsReducer";
import locationReducer from "./locationReducer";
import authReducer from "./authReducer";
import layoutReducer from "./layoutReducer";
import notificationReducer from "./notificationReducer";


export default combineReducers({
	routing: routerReducer,
	virtualLocations: locationReducer,
	labTemplates: labReducers,
	myLabs: myLabsReducers,
	user: authReducer, // {isAuthenticated, username}
	layout: layoutReducer,
	notification: notificationReducer
});
