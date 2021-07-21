/*
 * File: /src/core/layout/Tabs/Tabs.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Tab Manager component
 * File Created: Tuesday, 27th April 2021 10:05 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 12th July 2021 5:37 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CircularProgress from "@material-ui/core/CircularProgress";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useTheme } from '@material-ui/core/styles';

/**
 * TabManager
 *
 * @param {*} props Component props
 * @returns {*} Component
 */
function TabManager(props) {

	const theme = useTheme();

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
    function getTab(component, key, isDisabled, isExtra) {
        const tabClass = isExtra ? "tab-add" : "tab";
        return (
            <Tab
                disabled={isDisabled == null ? false : isDisabled}
                key={key}
                className={[tabClass, props.variant]}
                style={{ 
					color: theme.palette.primary.main,
					borderColor: theme.palette.primary.main
				}}
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
    function getPanel(component, key) {
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
    function getCompleteComponent(tabs, panels, defaultIndex) {
        return (
            <Tabs
                defaultIndex={
                    props.selectedIndex != null ? undefined : defaultIndex
                }
                selectedIndex={props.selectedIndex}
                onSelect={props.onSelect}>
                <TabList
                    className={["tab-list", props.variant, props.alignment]}>
                    {tabs}
                </TabList>
                {panels}
            </Tabs>
        );
    }

    let tabs = [];
    let panels = [];
    let elementIndex = 0;
    let defaultIndex = -1;

    props.items?.forEach((item) => {
        if (defaultIndex === -1 && item.isDisabled !== true) {
            defaultIndex = elementIndex;
        }

        tabs.push(
            getTab(item.title, "tab-" + elementIndex, item.isDisabled, false)
        );
        panels.push(getPanel(item.component, "panel-" + elementIndex++));
    });

    props.extraButtons?.forEach((item) => {
        tabs.push(
            getTab(
                item.tabComponent,
                "tab-" + elementIndex++,
                item.isDisabled,
                true
            )
        );
        panels.push(
            getPanel(
                <div className={"centering pad-20"}>
                    <CircularProgress color={"primary"} />
                </div>,
                "panel-" + elementIndex++
            )
        );
    });

    return getCompleteComponent(
        tabs,
        panels,
        props.defaultIndex != null ? props.defaultIndex : defaultIndex
    );
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
        })
    ),
    selectedIndex: PropTypes.number,
    onSelect: PropTypes.func,
    defaultIndex: PropTypes.number,
};

export default TabManager;
