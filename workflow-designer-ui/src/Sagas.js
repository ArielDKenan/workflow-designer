import { all } from 'redux-saga/effects';

import { restSagas } from 'common/src/rest/RestSagas.js';
import { metricsSagas } from './components/metrics/MetricsSagas.js';

function* rootSaga() {
    yield all([restSagas, metricsSagas]);
}
export default rootSaga;
