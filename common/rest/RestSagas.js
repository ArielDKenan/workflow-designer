import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { I18n } from 'react-redux-i18n';

import { actionTypes as modalActionTypes } from 'common/ui-components/modal/ModalConstants.js';
import { restActions } from 'common/rest/RestConstants.js';

function buildUrl(options) {
    let url = null;
    if (options.baseUrl !== undefined) {
        url = options.baseUrl;
        if (options.id !== undefined) {
            if (!url.endsWith('/')) {
                url += '/';
            }
            url += options.id;
        }
    } else {
        url = options.url;
    }
    if (DEBUG) {
        console.log('Rest API = Calling URL ' + url);
    }
    return url;
}

function getHeaders(options) {
    let headers = options.headers === undefined ? [] : options.headers;
    headers['content-type'] = 'application/json';
    headers['USER_ID'] = options.userId;
    return headers;
}

function* startRequest(action) {
    if (
        action.options.noLoader === undefined ||
        action.options.noLoader === false
    ) {
        yield put({ type: restActions.API_SENT });
    }
}

function* finishRequest(action) {
    if (
        action.options.noLoader === undefined ||
        action.options.noLoader === false
    ) {
        yield put({ type: restActions.API_RECEIVED });
    }
}

function* handleFailure(e, action) {
    if (DEBUG) {
        console.log('FAILED');
        console.log(e);
        console.log(action);
    }
    yield put({
        type: modalActionTypes.SHOW_MODAL,
        options: {
            type: 'error',
            title: I18n.t('rest.error.title'),
            body: I18n.t('rest.error.body', {
                url: buildUrl(action.options)
            })
        }
    });
    yield put({ type: restActions.API_FAILED });
}

function* apiFetch(action) {
    try {
        yield* startRequest(action);
        let options = action.options;

        let config = {
            method: 'GET',
            url: buildUrl(options),
            headers: getHeaders(options)
        };
        let response = yield call(axios, config);
        if (response.code !== undefined && response.code !== 200) {
            console.log('OH NO!');
        }
        if (options.additionalData !== undefined) {
            response.data = Object.assign(
                options.additionalData,
                response.data
            );
        }
        if (action.successDispatchType !== undefined) {
            yield put({
                type: action.successDispatchType,
                payload: response.data
            });
        }
        yield* finishRequest(action);
        return response.data;
    } catch (e) {
        yield* handleFailure(e, action);
        throw e;
    }
}

function* apiCreate(action) {
    try {
        yield* startRequest(action);
        let options = action.options;
        let config = {
            method: 'POST',
            url: buildUrl(options),
            data: action.data,
            headers: getHeaders(options)
        };
        let response = yield call(axios, config);
        if (response.code !== undefined && response.code !== 200) {
            console.log('OH NO!');
        }
        if (options.additionalData !== undefined) {
            response.data = Object.assign(
                options.additionalData,
                response.data
            );
        }
        if (action.successDispatchType !== undefined) {
            yield put({
                type: action.successDispatchType,
                payload: response.data
            });
        }
        yield* finishRequest(action);
        return response.data;
    } catch (e) {
        yield* handleFailure(e, action);
        throw e;
    }
}

function* apiUpdate(action) {
    try {
        yield* startRequest(action);
        let options = action.options;
        let config = {
            method: 'PUT',
            url: buildUrl(options),
            data: action.data,
            headers: getHeaders(options)
        };
        let response = yield call(axios, config);
        if (response.code !== undefined && response.code !== 200) {
            console.log('OH NO!');
        }
        if (options.additionalData !== undefined) {
            response.data = Object.assign(
                options.additionalData,
                response.data
            );
        }
        if (action.successDispatchType !== undefined) {
            yield put({
                type: action.successDispatchType,
                payload: response.data
            });
        }
        yield* finishRequest(action);
        return response.data;
    } catch (e) {
        yield* handleFailure(e, action);
        throw e;
    }
}

function* apiDelete(action) {
    try {
        yield* startRequest(action);
        let options = action.options;
        let config = {
            method: 'DELETE',
            url: buildUrl(options),
            headers: getHeaders(options)
        };
        let response = yield call(axios, config);
        if (options.additionalData !== undefined) {
            response.data = Object.assign(
                options.additionalData,
                response.data
            );
        }
        if (action.successDispatchType !== undefined) {
            yield put({
                type: action.successDispatchType,
                id: options.id,
                payload: response.data
            });
        }
        yield* finishRequest(action);
        return response.data;
    } catch (e) {
        yield* handleFailure(e, action);
    }
}

function* apiDeleteConfirmation(action) {
    yield put({
        type: modalActionTypes.SHOW_MODAL,
        options: {
            type: 'alert',
            actionButtonClick: () => {
                action.confirmHandler(action.confirmHandlerData);
            },
            title: I18n.t('modal.delete.title'),
            body: I18n.t('modal.delete.body', { name: action.displayName })
        }
    });
}

export const callApiCreate = apiCreate;
export const callApiUpdate = apiUpdate;
export const callApiFetch = apiFetch;
export const callApiDelete = apiDelete;
export const callApiDeleteConfirmation = apiDeleteConfirmation;

export const restSagas = [
    takeEvery(restActions.API_CREATE, apiCreate),
    takeEvery(restActions.API_UPDATE, apiUpdate),
    takeEvery(restActions.API_FETCH, apiFetch),
    takeEvery(restActions.API_DELETE, apiDelete),
    takeEvery(restActions.API_DELETE_CONFIRMATION, apiDeleteConfirmation)
];
