import { actionTypes } from './ModalConstants.js';

const initialState = { show: false, size: 'small', type: 'alert' };

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_MODAL:
            let additionalData = action.options;
            return {
                ...state,
                show: true,
                ...additionalData
            };
        case actionTypes.HIDE_MODAL:
            return initialState;
        default:
            return state;
    }
};
