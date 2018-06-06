import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { parse } from 'query-string';
import 'sdc-ui/css/style.css';
import 'common/resources/scss/common_style.scss';

import Loader from 'common/src/shared-components/loader/Loader.jsx';
import Modal from 'common/src/ui-components/modal/Modal.jsx';
import Monitoring from './components/monitoring/Monitoring.js';
import Metrics from './components/metrics/Metrics.js';

import store from './AppStore.js';

function getExternalData(location) {
    let externalData = parse(location.search);
    if (externalData.isReadOnlyMode === undefined) {
        externalData.isReadOnlyMode = true;
    } else {
        externalData.isReadOnlyMode =
            externalData.isReadOnlyMode.toLowerCase() === 'true';
    }
    return externalData;
}

const MonitoringPage = ({ location }) => {
    return <Monitoring externalData={getExternalData(location)} />;
};
const MetricsPage = ({ location }) => {
    return <Metrics externalData={getExternalData(location)} />;
};

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Switch>
                        <Route
                            path="/monitoring.html"
                            component={MonitoringPage}
                        />
                        <Route path="/metrics.html" component={MetricsPage} />
                    </Switch>
                    <Modal />
                    <Loader />
                </div>
            </Provider>
        );
    }
}
export default App;
