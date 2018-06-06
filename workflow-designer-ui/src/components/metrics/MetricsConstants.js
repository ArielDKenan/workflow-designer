import keyMirror from 'keymirror';

export const callTypes = keyMirror({
    METRICS_CALL_INIT: null,
    METRICS_CALL_OPEN_EDITOR: null,
    METRICS_CALL_SUBMIT_EDITOR: null
});

export const actionTypes = keyMirror({
    METRICS_OPEN_EDITOR: null,
    METRICS_CLOSE_EDITOR: null,
    METRICS_LOADED: null,
    METRICS_REFERENCE_DATA_LOADED: null,
    METRICS_ITEM_DATA_LOADED: null,
    METRICS_DELETED: null,
    METRIC_CREATED: null
});

export const REST_PATH = '/metrics/';
