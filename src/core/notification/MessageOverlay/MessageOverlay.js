/*
 * File: /src/core/notification/MessageOverlay/MessageOverlay.js
 * Version: 1.0.0
 * Project: @siliconmtn/spacelibs-react
 * Description: Compnant to add an overlay animation and or message 
 * to the entire screen.
 * File Created: Wednesday, 19th May 2021 3:16 pm
 * Author: James Camire (james@siliconmtn.com)
 * -----
 * Last Modified: 
 * Modified By: 
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTheme } from '@material-ui/core/styles';

/**
 * Component to display the change history for an EZ Form group
 *
 * @class MessageOverlay
 */
 class MessageOverlay extends React.Component {

    /**
     * Creates an instance of NewAdmin.
     * @param {*} props - Component props
     * @memberof NewAdmin
     */
    constructor(props) {
        super(props);
        this.state = {
            color : props.color,
            message : props.message,
            showOverlay : props.showOverlay,
            emptyAnimation : props.emptyAnimation
        };

        this.processActionButton = this.processActionButton.bind(this);
    }

    /**
     * Assigns the component animation.  The default is circular progress
     * @returns {*} The provided animation or one set through the child attribute
     */
    assignAnimation() {
        if (this.state.emptyAnimation) return "";
        else return (! this.props.children) ? <CircularProgress color={this.state.color} /> : this.props.children;
    }

    /**
     * Gets the style elements for the overlay
     * @returns {*} Object with the style elements
     */
    getCoverStyle() {
        return {
            position : "fixed",
            top : 0,
            left : 0,
            background : "rgba(0,0,0,0.6)",
            zIndex : 5,
            width : "100%",
            height : "100%",
            display : this.state.showOverlay ? "block" : "none"
        };
    }

    /**
     * Gets the style elements for the overlay
     * @returns {*} Object with the style elements
     */
    getLoadingStyle() {
        const theme = useTheme();
        let color = this.state.color === "primary" ? theme.palette.primary1Color : theme.palette.secondary;
        return {
            position : "fixed",
            color : color,
            display : "table-cell",
            left : "48%",
            top : "33%",
            verticalAlign : "middle"
        };
    }

    /**
     * Renders the display output
     * @returns {*} Output display for this component 
     */
    render() {
        return(
            <div style={this.getCoverStyle()}> 
                <div style={this.getLoadingStyle()}>{ this.assignAnimation() } <br/>{ this.state.message}</div>
            </div>
        );
    }
}


MessageOverlay.propTypes = {
    showOverlay : PropTypes.bool,
    emptyAnimation : PropTypes.bool,
    color : PropTypes.oneOf(["inherit", "primary", "secondary"]),
    message : PropTypes.string,
    children: PropTypes.any
};

export default MessageOverlay;