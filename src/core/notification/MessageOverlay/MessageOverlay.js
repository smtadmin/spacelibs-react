/*
 * File: /src/core/notification/MessageOverlay/MessageOverlay.js
 * Version: 1.0.0
 * Project: @siliconmtn/spacelibs-react
 * Description: Compnant to add an overlay animation and or message
 * to the entire screen.
 * File Created: Wednesday, 19th May 2021 3:16 pm
 * Author: James Camire (james@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 8th June 2021 3:13 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTheme } from "@material-ui/core/styles";

/**
 * Main function for the overlay component
 * @param {*} props Properties for the function
 * @returns Fully configured overlay object
 */
function MessageOverlay(props) {
    /**
     * Assigns the component animation.  The default is circular progress
     * @returns {*} The provided animation or one set through the child attribute
     */
    function assignAnimation() {
        if (props.emptyAnimation) return "";
        else
            return !props.children ? (
                <CircularProgress color={props.color} />
            ) : (
                props.children
            );
    }

    /**
     * Gets the style elements for the overlay
     * @returns {*} Object with the style elements
     */
    function getCoverStyle() {
        return {
            position: "fixed",
            top: 0,
            left: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 100000,
            width: "100%",
            height: "100%",
            display: props.showOverlay ? "block" : "none",
        };
    }

    /**
     * Gets the style elements for the overlay
     * @returns {*} Object with the style elements
     */
    function getLoadingStyle() {
        const theme = useTheme();
        let color;
        if (props.color === "primary") {
            color = theme.palette.primary1Color;
        } else if (props.color === "secondary") {
            color = theme.palette.secondary;
        } else {
            color = props.color;
        }

        return {
            position: "relative",
            color: color,
            display: "block",
            top: "40%",
            verticalAlign: "middle",
			textAlign: "center"
        };
    }

    return (
        <div style={getCoverStyle()}>
            <div style={getLoadingStyle()}>
                {assignAnimation()}<br />
                {props.message}
            </div>
        </div>
    );
}

MessageOverlay.defaultProps = {
    emptyAnimation: false,
    color: "primary",
};

MessageOverlay.propTypes = {
    showOverlay: PropTypes.bool,
    emptyAnimation: PropTypes.bool,
    color: PropTypes.string,
    message: PropTypes.string,
    children: PropTypes.any,
};

export default MessageOverlay;
