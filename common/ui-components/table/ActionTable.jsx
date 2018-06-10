import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import classnames from 'classnames';

import SVGIcon from 'sdc-ui/lib/react/SVGIcon.js';

export default class ActionTable extends React.Component {
    render() {
        if (this.props.data.length > 0) {
            for (let prop in this.props.columns) {
                let className = this.props.columns[prop].className;
                className =
                    className === undefined
                        ? 'actionTableText'
                        : className + ' actionTableText';
                this.props.columns[prop].className = className;
            }
            return (
                <div className="action-table-view">
                    <ReactTable
                        getTdProps={(state, rowInfo, column) => {
                            return {
                                onClick: () => {
                                    if (!column.noClick) {
                                        this.props.onClick(
                                            this.props.data[rowInfo.index]
                                        );
                                    }
                                }
                            };
                        }}
                        className={classnames(
                            '-highlight',
                            'action-table',
                            this.props.className
                        )}
                        columns={this.props.columns}
                        data={this.props.data}
                        defaultPageSize={this.props.data.length}
                        sortable={true}
                        resizable={false}
                        showPagination={false}
                    />
                </div>
            );
        } else {
            return (
                <div className="action-table-view action-table-view-add-first">
                    <div className="action-table-add-first">
                        <SVGIcon
                            name="plusCircle"
                            className="add-table-first-item"
                            data-test-id="add-table-first-item"
                            label={this.props.addButtonLabel}
                            onClick={this.props.addButtonClick}
                        />
                    </div>
                </div>
            );
        }
    }
}
