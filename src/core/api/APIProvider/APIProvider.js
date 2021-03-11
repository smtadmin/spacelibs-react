/*
 * File: /src/core/api/P1APIProvider/P1APIProvider.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: This is the API Context provider
 * File Created: Wednesday, 17th February 2021 4:53 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 9th March 2021 12:46 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";
import APIContext from "../APIContext";
import BaseHTTPService from "@siliconmtn/spacelibs-js/core/io/BaseHTTPService";

/**
 * API Context provider
 * @param {object} props - Component props
 * @class APIProvider
 */
class APIProvider extends React.Component {
    /**
     * Constructs an APIProvider
     * @param {*} props - Component Props
     */
    constructor(props) {
        super(props);

        let config = {};

        if (this.props.baseURL) {
            config.host = this.props.baseURL;
        }

        this.state = {
            service: new BaseHTTPService(config),
        };
    }

    /**
     * Renders components
     *
     * @returns {*} APIProvider component
     * @memberof APIProvider
     */
    render() {
        return (
            <APIContext.Provider
                value={{
                    read: this.state.service.read.bind(this.state.service),
                    update: this.state.service.update.bind(this.state.service),
                    insert: this.state.service.insert.bind(this.state.service),
                    delete: this.state.service.delete.bind(this.state.service),
                    baseURL: this.state.service.getBaseURL(),
                }}>
                {this.props.children}
            </APIContext.Provider>
        );
    }
}

/**
 * Accepted props
 */
APIProvider.propTypes = {
    children: PropTypes.any,
    baseUrl: PropTypes.string,
};

export default APIProvider;
