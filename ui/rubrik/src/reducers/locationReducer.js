import { SELECT_VIRTUAL_DATA_UNIT, FETCH_VIRTUAL_DATA_UNITS } from "../actions";
const INITIAL_STATE = {
    virtualDataUnits: [],
    views: [{ id: "", name: "view" }],
    selectedVirtualDataUnit: ""
};

/* Reducer: For virtualDataUnitReducer
 */
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_VIRTUAL_DATA_UNIT:
            return {
                ...state,
                selectedVirtualDataUnit: action.payload.selectedVirtualDataUnit
            };
        case FETCH_VIRTUAL_DATA_UNITS:
            return {
                ...state,
                virtualDataUnits: action.payload.virtualDataUnits,
                selectedVirtualDataUnit: action.payload.selectedVirtualDataUnit
            };
        default:
            return state;
    }
};
