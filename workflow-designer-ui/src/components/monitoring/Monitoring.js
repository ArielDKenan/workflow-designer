import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { actionTypes as modalActionTypes } from 'common/src/ui-components/modal/ModalConstants.js';
import { actionTypes } from './MonitoringConstants.js';
import { monitoringTabs } from './MonitoringConstants';
import Tabs from 'sdc-ui/lib/react/Tabs.js';
import Tab from 'sdc-ui/lib/react/Tab.js';
import Metrics from 'aee-app/components/metrics/Metrics.js';

function mapDispatchToProps(dispatch) {
    return {
        initMonitoring: externalData => {
            if (externalData === undefined || externalData.id === undefined) {
                dispatch({
                    type: modalActionTypes.SHOW_MODAL,
                    options: {
                        type: 'error',
                        title: I18n.t('monitoring.no_external_data.title'),
                        body: I18n.t('monitoring.no_external_data.body')
                    }
                });
            }
        },
        switchTab: tabId => {
            dispatch({
                type: actionTypes.ACTIVE_TAB,
                activeTab: tabId
            });
        }
    };
}

export const mapStateToProps = ({ monitoring, context }) => {
    return {
        context: context,
        activeTab: monitoring.activeTab,
        thresholds: monitoring.thresholds,
        metrics: monitoring.metrics
    };
};

class Monitoring extends React.Component {
    render() {
        let { isReadOnlyMode } = this.props.externalData;
        let { activeTab, switchTab } = this.props;
        return (
            <div id="monitoring-view">
                <Tabs
                    type="menu"
                    activeTab={activeTab}
                    onTabClick={tabId => switchTab(tabId)}>
                    <Tab
                        disabled={isReadOnlyMode === true}
                        title={I18n.t('monitoring.tab.metrics')}
                        tabId={monitoringTabs.METRICS}>
                        <div id="metrics-tab">
                            <Metrics
                                isReadOnlyMode={isReadOnlyMode}
                                externalData={this.props.externalData}
                            />
                        </div>
                    </Tab>
                    <Tab
                        disabled={isReadOnlyMode}
                        title={I18n.t('monitoring.tab.thresholds')}
                        tabId={monitoringTabs.THRESHOLDS}>
                        <div id="thresholds-tab">
                            this will have thresholds.
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitoring);
