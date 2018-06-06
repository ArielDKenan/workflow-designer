import React from 'react';
import { I18n } from 'react-redux-i18n';
import Form from 'common/src/shared-components/input/validation/Form.jsx';
import Input from 'common/src/shared-components/input/validation/Input.jsx';
import FormValidationHelper from 'common/src/validation-form/FormValidationHelper.js';
import { connect } from 'react-redux';
import { callTypes } from './MetricsConstants.js';
import { actionTypes as modalActionTypes } from 'common/src/ui-components/modal/ModalConstants';

function mapDispatchToProps(dispatch) {
    return {
        onDataChanged: deltaData =>
            FormValidationHelper.dataChanged(dispatch, {
                deltaData
            }),
        validateForm: () => {
            FormValidationHelper.validateForm(dispatch);
        },
        onSubmit: (componentId, item) => {
            // TODO handle edit and create
            dispatch({
                type: callTypes.METRICS_CALL_SUBMIT_EDITOR,
                data: item,
                componentId: componentId
            });
        },
        onCancel: () => {
            dispatch({
                type: modalActionTypes.HIDE_MODAL
            });
        }
    };
}

export const mapStateToProps = ({ metricEditor, metrics, context }) => {
    return {
        data: metricEditor.data,
        formReady: metricEditor.formReady,
        validationFieldsInfo: metricEditor.validationFieldsInfo,
        reference: metrics.reference,
        context: context.internal
    };
};

class MetricEditorView extends React.Component {
    render() {
        let {
            onCancel,
            isReadOnlyMode,
            formReady,
            validationFieldsInfo,
            onDataChanged,
            onSubmit,
            validateForm,
            data,
            reference,
            context
        } = this.props;
        let {
            name,
            description,
            metricType,
            reuse,
            collectorType,
            // collectorVersion,
            timeout,
            interval
        } = data;
        let editingMode = data.id !== undefined;
        // setting some options on the dynamic selects
        let disableCollectorType =
            metricType === undefined || metricType === '';
        let collectorTypesOptions = [];
        if (!disableCollectorType) {
            collectorTypesOptions = reference.collectorTypes[metricType];
        }
        let disableCollectorVersion = disableCollectorType
            ? true
            : collectorType === undefined || collectorType === '';
        let collectorVersions = [];
        //if (!disableCollectorVersion) {
        //    let collectorVersions = reference.collectorTypes[metricType][collectorType].versions;
        //}
        // let disableCollectorFields = (disableCollectorVersion) ? true : (collectorVersion !== undefined && collectorVersion !== '') ;
        return (
            <div>
                <Form
                    ref={form => {
                        this.form = form;
                    }}
                    hasButtons={true}
                    onReset={onCancel}
                    labledButtons={true}
                    isReadOnlyMode={isReadOnlyMode}
                    formReady={formReady}
                    isValid={FormValidationHelper.checkFormValid(
                        validationFieldsInfo
                    )}
                    submitButtonText={
                        editingMode
                            ? I18n.t(
                                  'monitoring.metrics.editor.form.button.save'
                              )
                            : I18n.t(
                                  'monitoring.metrics.editor.form.button.create'
                              )
                    }
                    onSubmit={() => {
                        onSubmit(context.id, data);
                    }}
                    onValidateForm={validateForm}>
                    <Input
                        disabled={isReadOnlyMode}
                        isRequired={FormValidationHelper.checkIsFieldRequired(
                            validationFieldsInfo,
                            'name'
                        )}
                        onChange={name => onDataChanged({ name })}
                        label={I18n.t('monitoring.metrics.editor.fields.name')}
                        data-test-id="metrics-editor-name"
                        value={name}
                        isValid={validationFieldsInfo.name.isValid}
                        errorText={validationFieldsInfo.name.errorText}
                        type="text"
                        className="metric-editor-name"
                    />
                    <Input
                        disabled={isReadOnlyMode}
                        isRequired={FormValidationHelper.checkIsFieldRequired(
                            validationFieldsInfo,
                            'description'
                        )}
                        onChange={description => onDataChanged({ description })}
                        label={I18n.t(
                            'monitoring.metrics.editor.fields.description'
                        )}
                        data-test-id="metrics-editor-description"
                        value={description}
                        isValid={validationFieldsInfo.description.isValid}
                        errorText={validationFieldsInfo.description.errorText}
                        type="text"
                        className="metric-editor-description"
                    />
                    <Input
                        isRequired={FormValidationHelper.checkIsFieldRequired(
                            validationFieldsInfo,
                            'reuse'
                        )}
                        onChange={e => {
                            const selectedIndex = e.target.selectedIndex;
                            const val = e.target.options[selectedIndex].value;
                            onDataChanged({ reuse: val });
                        }}
                        value={reuse}
                        label={I18n.t('monitoring.metrics.editor.fields.reuse')}
                        data-test-id="metrics-editor-reuse"
                        isValid={validationFieldsInfo.reuse.isValid}
                        errorText={validationFieldsInfo.reuse.errorText}
                        groupClassName="bootstrap-input-options"
                        className="input-options-select"
                        type="select">
                        {reference.reuse.map(mtype => (
                            <option key={mtype.enum} value={mtype.enum}>{`${
                                mtype.title
                            }`}</option>
                        ))}
                    </Input>

                    <Input
                        isRequired={FormValidationHelper.checkIsFieldRequired(
                            validationFieldsInfo,
                            'metricType'
                        )}
                        onChange={e => {
                            const selectedIndex = e.target.selectedIndex;
                            const val = e.target.options[selectedIndex].value;
                            onDataChanged({ metricType: val });
                        }}
                        value={metricType}
                        label={I18n.t('monitoring.metrics.editor.fields.type')}
                        data-test-id="metrics-editor-type"
                        isValid={validationFieldsInfo.metricType.isValid}
                        errorText={validationFieldsInfo.metricType.errorText}
                        groupClassName="bootstrap-input-options"
                        className="input-options-select"
                        type="select">
                        {reference.types.map(mtype => (
                            <option key={mtype.enum} value={mtype.enum}>{`${
                                mtype.title
                            }`}</option>
                        ))}
                    </Input>
                    <Input
                        isRequired={FormValidationHelper.checkIsFieldRequired(
                            validationFieldsInfo,
                            'collectorType'
                        )}
                        disabled={isReadOnlyMode || disableCollectorType}
                        onChange={e => {
                            const selectedIndex = e.target.selectedIndex;
                            const val = e.target.options[selectedIndex].value;
                            onDataChanged({ collectorType: val });
                        }}
                        value={collectorType}
                        label={I18n.t(
                            'monitoring.metrics.editor.fields.collectorType'
                        )}
                        data-test-id="metrics-editor-collectorType"
                        isValid={validationFieldsInfo.collectorType.isValid}
                        errorText={validationFieldsInfo.collectorType.errorText}
                        groupClassName="bootstrap-input-options"
                        className="input-options-select"
                        type="select">
                        {collectorTypesOptions.map(mtype => (
                            <option key={mtype.enum} value={mtype.enum}>{`${
                                mtype.title
                            }`}</option>
                        ))}
                    </Input>
                    <Input
                        isRequired={FormValidationHelper.checkIsFieldRequired(
                            validationFieldsInfo,
                            'collectorVersion'
                        )}
                        disabled={isReadOnlyMode || disableCollectorVersion}
                        onChange={e => {
                            const selectedIndex = e.target.selectedIndex;
                            const val = e.target.options[selectedIndex].value;
                            onDataChanged({ collectorVersion: val });
                        }}
                        value={metricType}
                        label={I18n.t(
                            'monitoring.metrics.editor.fields.collectorVersion'
                        )}
                        data-test-id="metrics-editor-type"
                        isValid={validationFieldsInfo.collectorVersion.isValid}
                        errorText={
                            validationFieldsInfo.collectorVersion.errorText
                        }
                        groupClassName="bootstrap-input-options"
                        className="input-options-select"
                        type="select">
                        {collectorVersions.map(mtype => (
                            <option key={mtype} value={mtype}>{`${
                                mtype.title
                            }`}</option>
                        ))}
                    </Input>
                    <Input
                        isRequired={FormValidationHelper.checkIsFieldRequired(
                            validationFieldsInfo,
                            'timeout'
                        )}
                        disabled={isReadOnlyMode}
                        onChange={timeout => onDataChanged({ timeout })}
                        label={I18n.t(
                            'monitoring.metrics.editor.fields.timeout'
                        )}
                        data-test-id="metrics-editor-timeout"
                        value={timeout}
                        isValid={validationFieldsInfo.timeout.isValid}
                        errorText={validationFieldsInfo.timeout.errorText}
                        type="text"
                        className="metric-editor-timeout"
                    />
                    <Input
                        isRequired={FormValidationHelper.checkIsFieldRequired(
                            validationFieldsInfo,
                            'interval'
                        )}
                        disabled={isReadOnlyMode}
                        onChange={interval => onDataChanged({ interval })}
                        label={I18n.t(
                            'monitoring.metrics.editor.fields.interval'
                        )}
                        data-test-id="metrics-editor-interval"
                        value={interval}
                        isValid={validationFieldsInfo.interval.isValid}
                        errorText={validationFieldsInfo.interval.errorText}
                        type="text"
                        className="metric-editor-interval"
                    />
                </Form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetricEditorView);
