import React from 'react';
import uniqueId from 'lodash/uniqueId';
import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import Input from './shared-components/input/validation/Input.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import classNames from 'classnames';

export default class InputWithTooltip extends Input {
    render() {
        return this.renderWithTooltip();
    }

    renderWithTooltip() {
        /* eslint-disable no-unused-vars */
        const {
            label,
            isReadOnlyMode = false,
            value,
            onBlur,
            onKeyDown,
            type,
            disabled,
            checked,
            name
        } = this.props;
        const {
            groupClassName,
            isValid = true,
            errorText,
            isRequired,
            overlayPos,
            ...inputProps
        } = this.props;
        /* eslint-enable no-unused-vars */
        let wrapperClassName =
            type !== 'radio'
                ? 'validation-input-wrapper'
                : 'validation-radio-wrapper';
        if (disabled) {
            wrapperClassName += ' disabled';
        }

        let hasToolTip = this.props.tooltip !== undefined;
        if (isReadOnlyMode || Boolean(disabled)) {
            hasToolTip = false;
        }
        return (
            <div className={wrapperClassName}>
                <FormGroup
                    className={classNames('form-group', [groupClassName], {
                        required: isRequired,
                        'has-error': !isValid
                    })}>
                    {label && (
                        <label className="control-label control-label-tooltip">
                            <span className="control-label-text">{label}</span>
                            <span>
                                <InfoTooltip
                                    message={
                                        hasToolTip
                                            ? this.props.tooltip
                                            : undefined
                                    }
                                    id={uniqueId('tooltip-field-')}
                                />
                            </span>
                        </label>
                    )}
                    {type === 'text' && (
                        <FormControl
                            bsClass={'form-control input-options-other'}
                            onChange={e => this.onChange(e)}
                            disabled={isReadOnlyMode || Boolean(disabled)}
                            onBlur={onBlur}
                            onKeyDown={onKeyDown}
                            value={value || ''}
                            inputRef={input => (this.input = input)}
                            type={type}
                            data-test-id={this.props['data-test-id']}
                        />
                    )}
                    {type === 'number' && (
                        <FormControl
                            bsClass={'form-control input-options-other'}
                            onChange={e => this.onChange(e)}
                            disabled={isReadOnlyMode || Boolean(disabled)}
                            onBlur={onBlur}
                            onKeyDown={onKeyDown}
                            value={value !== undefined ? value : ''}
                            inputRef={input => (this.input = input)}
                            type={type}
                            data-test-id={this.props['data-test-id']}
                        />
                    )}
                    {type === 'select' && (
                        <FormControl
                            onClick={e => this.optionSelect(e)}
                            className="custom-select"
                            componentClass={type}
                            inputRef={input => (this.input = input)}
                            name={name}
                            {...inputProps}
                            data-test-id={this.props['data-test-id']}
                        />
                    )}
                </FormGroup>
                {this.renderErrorOverlay()}
            </div>
        );
    }
}
