import { all } from 'redux-saga/effects';

import { restSagas } from 'common/rest/RestSagas.js';

function* rootSaga() {
    yield all([restSagas]);
}
export default rootSaga;
