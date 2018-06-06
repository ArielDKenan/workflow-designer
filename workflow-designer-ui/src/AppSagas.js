import { takeEvery, put, call } from 'redux-saga/effects';

import { callApiFetch } from 'common/src/rest/RestSagas.js';
import { restActions } from 'common/src/rest/RestConstants.js';

import { actionTypes as contextActionTypes } from 'aee-app/AppConstants.js';
import config from 'aee-app/config/Configuration.js';

import { actionTypes as loaderActionTypes } from 'common/src/shared-components/loader/LoaderConstants.js';

function* initFromExternalData(action) {
    yield put({
        type: loaderActionTypes.SHOW
    });
    // get the internal ID and context froms erver
    yield call(callApiFetch, {
        type: restActions.API_FETCH,
        options: {
            baseUrl: config.getPrefixedUrl('ping'),
            id: action.externalData.id,
            noLoader: true
        }
    });
    yield put({
        type: loaderActionTypes.HIDE
    });
}

export const metricsSagas = [
    takeEvery(contextActionTypes.FETCH_INIT, initFromExternalData)
];
