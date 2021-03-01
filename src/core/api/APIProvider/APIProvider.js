/*
 * File: /src/core/api/P1APIProvider/P1APIProvider.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: This is the API Context provider
 * File Created: Wednesday, 17th February 2021 4:53 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 25th February 2021 4:08 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";
import APIContext from "../APIContext";
import SecurityContext from "../../security/P1SecurityContext";
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

		this.read.bind(this);
		this.update.bind(this);
		this.insert.bind(this);
		this.delete.bind(this);
    }

	/**
	 * This adds authentication headers if user is authenticated
	 *
	 * @param {*} originalOptions - options passed in request
	 * @returns {*} newOptions with header
	 * @memberof APIProvider
	 */
	getOptionsWithAuth(originalOptions = {}) {
        const securityContext = this.context;
        if ( securityContext && securityContext.tokens && securityContext.tokens.accessToken ) {
            if (!originalOptions.headers) {
                originalOptions.headers = {};
            }

            originalOptions.headers = {
                Authorization: "Bearer " + securityContext.tokens.accessToken,
            };
		}
		return originalOptions;
    }

    /**
     * Request call for reading/selecting data.  Uses the `GET` HTTP Method.
     * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
     * @param {object} params - Data for the request
     * @param {Function} onComplete - Handler for request completion
     * @param {object} options - Additional options for this request.
     * @memberof BaseHTTPService
     */
    read(url, params, onComplete, options = {}) {
        this.state.service.read(
            url,
            params,
            onComplete,
            this.getOptionsWithAuth(options)
        );
    }

    /**
     * Request call for inserting data.  Uses the `POST` HTTP Method.
     * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
     * @param {object} data - Data for the request
     * @param {object} params - Data for the request
     * @param {Function} onComplete - Handler for request completion
     * @param {object} options - Additional options for this request.
     * @memberof BaseHTTPService
     */
    insert(url, data, params, onComplete, options = {}) {
        this.state.service.insert(
            url,
            data,
            params,
            onComplete,
            this.getOptionsWithAuth(options)
        );
    }

    /**
     * Request call for deleting data.  Uses the `DELETE` HTTP Method.
     * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
     * @param {object} data - Data for the request
     * @param {object} params - Data for the request
     * @param {Function} onComplete - Handler for request completion
     * @param {object} options - Additional options for this request.
     * @memberof BaseHTTPService
     */
    delete(url, data, params, onComplete, options = {}) {
        this.state.service.delete(
            url,
            data,
            params,
            onComplete,
            this.getOptionsWithAuth(options)
        );
    }

    /**
     * Request call for updating existing data.  Uses the `PATCH` HTTP Method.
     * @param {string} url - Location for the request to go to.  Can be absolute and relative (if you passed in baseUrl to the constructor)
     * @param {object} data - Data for the request
     * @param {object} params - Data for the request
     * @param {Function} onComplete - Handler for responses. Handler is passed response object.
     * @param {object} options - Additional options for this request.
     * @memberof BaseHTTPService
     */
    update(url, data, params, onComplete, options = {}) {
        this.state.service.update(
            url,
            data,
            params,
            onComplete,
            this.getOptionsWithAuth(options)
        );
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
                    read: this.read.bind(this),
                    update: this.update.bind(this),
                    insert: this.insert.bind(this),
                    delete: this.delete.bind(this),
                    baseURL: this.state.service.getBaseURL()
                }}>
                {this.props.children}
            </APIContext.Provider>
        );
    }
}

/* Assinging context */
APIProvider.contextType = SecurityContext;

/**
 * Accepted props
 */
APIProvider.propTypes = {
    children: PropTypes.any,
    baseUrl: PropTypes.string,
};

export default APIProvider;
