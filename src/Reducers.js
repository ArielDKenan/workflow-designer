import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import LoaderReducer from 'common/shared-components/loader/LoaderReducer.js';
import ModalReducer from 'common/ui-components/modal/ModalReducer.js';
import { actionTypes } from './AppConstants.js';

function contextReducer(state = { isReadOnlyMode: true }, action) {
    switch (action.type) {
        case actionTypes.INIT_CONTEXT:
            return {
                ...state,
                internal: action.payload.internal,
                external: action.payload.external
            };
        default:
            return state;
    }
}

export default combineReducers({
    i18n: i18nReducer,
    loader: LoaderReducer,
    modal: ModalReducer,
    context: contextReducer
});
