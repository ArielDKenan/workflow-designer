import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import LoaderReducer from 'common/src/shared-components/loader/LoaderReducer.js';
import ModalReducer from 'common/src/ui-components/modal/ModalReducer.js';
import MonitorReducer from './components/monitoring/MonitoringReducer.js';
import MetricsReducer from './components/metrics/MetricsReducer.js';
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
    monitoring: MonitorReducer,
    context: contextReducer,
    ...MetricsReducer
});
