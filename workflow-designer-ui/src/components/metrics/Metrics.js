import { connect } from 'react-redux';
import React from 'react';
import { I18n } from 'react-redux-i18n';
import { restActions } from 'common/src/rest/RestConstants';
import ListItemField from 'common/src/ui-components/list/ListItemField.jsx';
import List from 'common/src/ui-components/list/List.jsx';
import ListItem from 'common/src/ui-components/list/ListItem.jsx';
import { actionTypes as modalActionTypes } from 'common/src/ui-components/modal/ModalConstants.js';
import config from 'aee-app/config/Configuration.js';
import { actionTypes, callTypes, REST_PATH } from './MetricsConstants.js';
import MetricEditor from './MetricEditor.js';

export const mapStateToProps = ({ metrics, context }) => {
    return {
        context: context,
        list: metrics.list
    };
};

function mapDispatchToProps(dispatch) {
    return {
        initMetrics: externalData => {
            if (externalData === undefined || externalData.id === undefined) {
                dispatch({
                    type: modalActionTypes.SHOW_MODAL,
                    options: {
                        type: 'error',
                        title: I18n.t('monitoring.no_external_data.title'),
                        body: I18n.t('monitoring.no_external_data.body')
                    }
                });
            } else {
                dispatch({
                    type: callTypes.METRICS_CALL_INIT,
                    externalData: externalData
                });
            }
        },
        openEditor: () => {
            dispatch({
                type: callTypes.METRICS_CALL_OPEN_EDITOR,
                modal: {
                    options: {
                        type: 'custom',
                        size: 'large',
                        title: I18n.t('monitoring.metrics.editor.title.add'),
                        BodyComponent: MetricEditor,
                        BodyProps: {
                            isReadOnly: false
                        }
                    }
                }
            });
        },
        handleDeleteItem: ({ componentId, item }) => {
            dispatch({
                type: restActions.API_DELETE,
                successDispatchType: actionTypes.METRICS_DELETED,
                options: {
                    baseUrl: config.getPrefixedUrl(componentId + REST_PATH),
                    id: item.id
                }
            });
        },
        deleteItem: (componentId, item, deleteHandler) => {
            dispatch({
                type: restActions.API_DELETE_CONFIRMATION,
                confirmHandler: deleteHandler,
                confirmHandlerData: { componentId: componentId, item: item },
                displayName: item.id
            });
        }
    };
}

class Metrics extends React.Component {
    componentDidMount() {
        if (this.props.context.internal === undefined) {
            this.props.initMetrics(this.props.externalData);
        }
    }

    render() {
        let { isReadOnlyMode } = this.props.externalData;
        let componentId = this.props.context.internal
            ? this.props.context.internal.id
            : null;
        return (
            <List
                isReadOnlyMode={isReadOnlyMode}
                plusButtonTitle={I18n.t('monitoring.metrics.button.add')}
                onAdd={() => {
                    this.props.openEditor();
                }}
                title={I18n.t('monitoring.metrics.title')}>
                {this.props.list.map(metric => (
                    <ListItem
                        key={'metric_' + metric.id}
                        isReadOnlyMode={isReadOnlyMode}
                        onSelect={() => console.log(metric.id + ' click me')}
                        onDelete={() => {
                            this.props.deleteItem(
                                componentId,
                                metric,
                                this.props.handleDeleteItem
                            );
                        }}>
                        <ListItemField>
                            <div className="metric-name text">
                                {metric.name}
                            </div>
                        </ListItemField>
                        <ListItemField>
                            <div className="metric-description text">
                                {metric.description}
                            </div>
                        </ListItemField>
                        <ListItemField>
                            <div className="metric-collector text">
                                {metric.collectorType}
                            </div>
                        </ListItemField>
                    </ListItem>
                ))}
            </List>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
