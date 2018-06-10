import React from 'react';
import TabPane from 'sdc-ui/lib/react/TabPane.js';
import Button from 'sdc-ui/lib/react/Button.js';

class TabsWithAdd extends React.Component {
    render() {
        const {
            type,
            children = [],
            activeTab,
            onTabClick,
            className,
            disabled
        } = this.props;

        return (
            <div
                className={
                    type === 'header'
                        ? `sdc-tabs sdc-tabs-header ${className || ''}`
                        : `sdc-tabs sdc-tabs-menu ${className || ''}`
                }>
                <div>
                    <ul className="sdc-tabs-list" role="tablist">
                        {children.map(child => {
                            return React.cloneElement(child, {
                                key: child.props.tabId,
                                onClick: () => {
                                    onTabClick(child.props.tabId);
                                },
                                activeTab: activeTab
                            });
                        })}
                        {children.map(child => {
                            if (
                                child.props.tabId === activeTab &&
                                child.props.onAddClick !== undefined
                            ) {
                                return (
                                    <li
                                        className="sdc-tab add-tab"
                                        key={'add-' + child.props.tabId}>
                                        <Button
                                            btnType="link"
                                            disabled={disabled === true}
                                            color="primary"
                                            iconName="plus"
                                            className="add-tab-button"
                                            data-test-id="metric-add"
                                            onClick={child.props.onAddClick}>
                                            {child.props.addButtonTitle}
                                        </Button>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
                <TabPane>
                    {children.map(child => {
                        if (child.props.tabId === activeTab) {
                            return child.props.children;
                        }
                    })}
                </TabPane>
            </div>
        );
    }
}

export default TabsWithAdd;
