import { actionTypes, monitoringTabs } from './MonitoringConstants.js';

export default (state = { activeTab: monitoringTabs.METRICS }, action) => {
    switch (action.type) {
        case actionTypes.ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.activeTab
            };
        default:
            return state;
    }
};
