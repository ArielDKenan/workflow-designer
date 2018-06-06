import { createFormValidationReducer } from 'common/src/validation-form/FormValidationReducer.js';
import { actionTypes } from './MetricsConstants.js';

const metricReducer = (state = { list: [], reference: {} }, action) => {
    switch (action.type) {
        case actionTypes.METRICS_LOADED:
            return {
                ...state,
                list: action.payload.results
            };
        case actionTypes.METRICS_REFERENCE_DATA_LOADED:
            return {
                ...state,
                reference: action.payload
            };
        default:
            return state;
    }
};

const metricFormReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.METRICS_OPEN_EDITOR:
            return {
                ...state,
                validationFieldsInfo: {
                    name: {
                        isValid: true,
                        errorText: '',
                        validations: [{ type: 'required', data: true }]
                    },
                    description: {
                        isValid: true,
                        errorText: '',
                        validations: []
                    },
                    timeout: {
                        isValid: true,
                        errorText: '',
                        validations: []
                    },
                    interval: {
                        isValid: true,
                        errorText: '',
                        validations: []
                    },
                    metricType: {
                        isValid: true,
                        errorText: '',
                        validations: []
                    },
                    reuse: {
                        isValid: true,
                        errorText: '',
                        validations: []
                    },
                    collectorType: {
                        isValid: true,
                        errorText: '',
                        validations: []
                    },
                    collectorVersion: {
                        isValid: true,
                        errorText: '',
                        validations: []
                    }
                },
                data: {
                    ...action.item
                }
            };
        case actionTypes.METRICS_CLOSE_EDITOR:
            return {};
        default:
            return state;
    }
};

export default {
    metrics: metricReducer,
    metricEditor: createFormValidationReducer(metricFormReducer)
};
