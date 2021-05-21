/*
 * File: /src/core/layout/Tabs/Tabs.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Tab Manager component
 * File Created: Tuesday, 27th April 2021 10:05 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 19th May 2021 2:51 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

/**
 * Tab Example class
 */
class TabManager extends React.Component {
    /**
     * Creates an instance of TabExample.
     * @param {*} props Props for component
     * @memberof TabExample
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * This returns a React element for our extra tabs
     *
     * @param {*} component - Component to render in the tab
     * @param {*} key - Element Key
     * @param {*} isDisabled - Whether or not the element is disabled
     * @param {*} isExtra - Whether or not the tab is an extra button
     * @returns {*} React element
     * @memberof TabManager
     */
    getTab(component, key, isDisabled, isExtra) {
        const tabClass = isExtra ? "tab-add" : "tab";
        return (
            <Tab
                disabled={isDisabled == null ? false : isDisabled}
                key={key}
                className={[tabClass, this.props.variant]}
                disabledClassName={"disabled"}
                selectedClassName={"selected"}>
                {component}
            </Tab>
        );
    }

    /**
     * This returns a list of panels, this is needed because our list needs to be keyed
     *
     * @param {*} component - Component to render in the panel
     * @param {*} key - Element key
     * @returns {*} React element
     * @memberof TabManager
     */
    getPanel(component, key) {
        return <TabPanel key={key}>{component}</TabPanel>;
    }

    /**
     * This returns the full component to be rendered
     *
     * @param {*} tabs - Regular tabs for the tab manager
     * @param {*} panels - Panels to show for each tab
     * @param {*} defaultIndex - The index of the tab to be selected by default
     * @returns {*} React element
     * @memberof TabManager
     */
    getCompleteComponent(tabs, panels, defaultIndex) {
        return (
            <Tabs
                defaultIndex={this.props.selectedIndex != null ? undefined : defaultIndex}
                selectedIndex={this.props.selectedIndex}
                onSelect={this.props.onSelect}>
                <TabList
                    className={[
                        "tab-list",
                        this.props.variant,
                        this.props.alignment,
                    ]}>
                    {tabs}
                </TabList>
                {panels}
            </Tabs>
        );
    }

    /**
     * Renders the component
     *
     * @returns {*} Rendered component
     * @memberof TabManager
     */
    render() {
        let tabs = [];
        let panels = [];
        let elementIndex = 0;
        let defaultIndex = -1;

        this.props.items?.forEach((item) => {
            if (defaultIndex === -1 && item.isDisabled !== true) {
                defaultIndex = elementIndex;
            }

            tabs.push(
                this.getTab(
                    item.title,
                    "tab-" + elementIndex,
                    item.isDisabled,
                    false
                )
            );
            panels.push(
                this.getPanel(item.component, "panel-" + elementIndex++)
            );
        });

        this.props.extraButtons?.forEach((item) => {
            tabs.push(
                this.getTab(
                    item.tabComponent,
                    "tab-" + elementIndex++,
                    item.isDisabled,
                    true
                )
            );
        });

        return this.getCompleteComponent(
            tabs,
			panels,
            this.props.defaultIndex != null
                ? this.props.defaultIndex
                : defaultIndex
        );
    }
}

TabManager.defaultProps = {
    alignment: "left",
    variant: "default",
};

TabManager.propTypes = {
    alignment: PropTypes.oneOf(["left", "center", "right"]),
    variant: PropTypes.oneOf(["default", "minimal"]),
    items: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            component: PropTypes.element,
            isDisabled: PropTypes.bool,
        })
    ).isRequired,
    extraButtons: PropTypes.arrayOf(
        PropTypes.exact({
            tabComponent: PropTypes.element,
            callback: PropTypes.func,
        })
    ),
    selectedIndex: PropTypes.number,
    onSelect: PropTypes.func,
    defaultIndex: PropTypes.number,
};

export default TabManager;
