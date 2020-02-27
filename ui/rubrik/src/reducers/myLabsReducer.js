import {
    FETCH_VDU_MY_LABS,
    FETCH_MY_SPECIFIC_LAB
} from "../actions";
const INITIAL_STATE = {
    virtualDataUnitInstances: null,
    specificLab: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_VDU_MY_LABS:
            return {
                ...state,
                virtualDataUnitInstances:
                    action.payload.virtualDataUnitInstances,
                errorMessage: null
            };
        case FETCH_MY_SPECIFIC_LAB:
            return {
                ...state,
                specificLab: action.payload.specificLab,
                errorMessage: null
            };
        default:
            return { ...state };
    }
};
