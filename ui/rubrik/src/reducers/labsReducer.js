import { FETCH_VDU_TEMPLATES } from "../actions";
const INITIAL_STATE = {  virtualDataUnitSpecific: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_VDU_TEMPLATES:
            return {
                ...state,
                virtualDataUnitSpecific: action.payload.virtualDataUnitSpecific
            };
        default:
            return { ...state };
    }
};