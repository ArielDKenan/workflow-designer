import React from 'react';
import SVGIcon from 'sdc-ui/lib/react/SVGIcon.js';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

export default class InfoToolTip extends React.Component {
    render() {
        let hasMessage = this.props.message !== undefined;
        return (
            <div className={this.props.className}>
                <a data-tip data-for={this.props.id}>
                    <SVGIcon
                        className={classNames('tooltip-icon', {
                            'tooltip-disabled': !hasMessage
                        })}
                        name="infoСircleO"
                        data-test-id="tool-tip"
                    />
                </a>
                {hasMessage && (
                    <ReactTooltip id={this.props.id}>
                        {this.props.message}
                    </ReactTooltip>
                )}
            </div>
        );
    }
}
