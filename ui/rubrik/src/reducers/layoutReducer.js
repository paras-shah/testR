import { TOGGLE_SIDEBAR, VDU_SEARCH } from "../actions";
const INITIAL_STATE = {  isSidebarOpened: false, searchTerm: '' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpened: action.payload.currentLayoutState,
            };
        case VDU_SEARCH:
            return {
                ...state,
                searchTerm: action.payload.searchTerm,
            };
        default:
            return { ...state };
    }
};