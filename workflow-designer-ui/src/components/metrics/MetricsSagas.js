import { takeEvery, put, call, select } from 'redux-saga/effects';

import { callApiFetch, callApiCreate } from 'common/src/rest/RestSagas.js';
import { restActions } from 'common/src/rest/RestConstants.js';

import { actionTypes as contextActionTypes } from 'aee-app/AppConstants.js';
import config from 'aee-app/config/Configuration.js';
import { actionTypes as modalActionTypes } from 'common/src/ui-components/modal/ModalConstants.js';
import { actionTypes as loaderActionTypes } from 'common/src/shared-components/loader/LoaderConstants.js';
import { actionTypes, callTypes, REST_PATH } from './MetricsConstants.js';

export const getMetricEditor = state => state.metricEditor;

function* submitEditor(action) {
    yield put({
        type: modalActionTypes.HIDE_MODAL
    });
    yield put({
        type: loaderActionTypes.SHOW
    });
    let createdMetric = yield call(callApiCreate, {
        type: restActions.API_CREATE,
        successDispatchType: actionTypes.METRIC_CREATED,
        options: {
            baseUrl: config.getPrefixedUrl(action.componentId + REST_PATH),
            noLoader: true,
            data: action.data
        }
    });
    console.log(createdMetric);
    yield call(callApiFetch, {
        type: restActions.API_FETCH,
        successDispatchType: actionTypes.METRICS_LOADED,
        options: {
            baseUrl: config.getPrefixedUrl(action.componentId + REST_PATH),
            noLoader: true
        }
    });
    yield put({
        type: loaderActionTypes.HIDE
    });
}

function* openEditor(action) {
    // getting the metric data for edit mode
    if (action.item) {
        yield put({
            type: loaderActionTypes.SHOW
        });
        // get the metric data
        yield call(callApiFetch, {
            type: restActions.API_FETCH,
            successDispatchType: actionTypes.METRICS_ITEM_DATA_LOADED,
            options: {
                baseUrl: config.getPrefixedUrl(
                    action.context.id + REST_PATH + action.item.id
                ),
                noLoader: true
            }
        });
        if (action.item) {
            yield put({
                type: loaderActionTypes.HIDE
            });
        }
    }
    yield put({
        type: actionTypes.METRICS_OPEN_EDITOR
    });
    let formData = yield select(getMetricEditor);
    action.modal.options.BodyProps = Object.assign(
        {},
        formData,
        action.modal.options.BodyProps
    );
    yield put({
        type: modalActionTypes.SHOW_MODAL,
        options: action.modal.options
    });
}

function* initMetrics(action) {
    // start the loader
    yield put({
        type: loaderActionTypes.SHOW
    });
    // get the internal ID and context froms erver
    let internalData = yield call(callApiFetch, {
        type: restActions.API_FETCH,
        options: {
            baseUrl: config.getPrefixedUrl(REST_PATH + 'ping'),
            id: action.externalData.id,
            noLoader: true
        }
    });
    // update the app context with internal and external context
    yield put({
        type: contextActionTypes.INIT_CONTEXT,
        payload: { internal: internalData, external: action.externalData }
    });
    // get the metrics data
    yield call(callApiFetch, {
        type: restActions.API_FETCH,
        successDispatchType: actionTypes.METRICS_LOADED,
        options: {
            baseUrl: config.getPrefixedUrl(internalData.id + REST_PATH),
            noLoader: true
        }
    });
    // get the metrics reference data
    yield call(callApiFetch, {
        type: restActions.API_FETCH,
        successDispatchType: actionTypes.METRICS_REFERENCE_DATA_LOADED,
        options: {
            baseUrl: config.getPrefixedUrl('reference/metrics'),
            noLoader: true
        }
    });

    // top the loader
    yield put({
        type: loaderActionTypes.HIDE
    });
}

export const metricsSagas = [
    takeEvery(callTypes.METRICS_CALL_INIT, initMetrics),
    takeEvery(callTypes.METRICS_CALL_OPEN_EDITOR, openEditor),
    takeEvery(callTypes.METRICS_CALL_SUBMIT_EDITOR, submitEditor)
];
