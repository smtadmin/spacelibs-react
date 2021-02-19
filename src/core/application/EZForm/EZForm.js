/*
 * File: EZForm
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: React component that displays a form using the EZForm api
 * File Created: Thursday, 18th February 2021 4:01 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Friday, 19th February 2021 11:22 am
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';
import HTTPService from '@siliconmtn/spacelibs-js/core/io/BaseHTTPService/BaseHTTPService';

/**
 * React component that displays a form using the EZForm api
 */
class EZForm extends React.Component {

    /**
     * Creates an instance of the EZForm class
     * @param {*} props - The props passed to the component
     */
    constructor(props) {
        super(props);
        this.state = {

        };
        this.getFormData(props.formId, props.bearerTokenCallback);
    }

    /**
     *Makes a request to the EZForm api to retrieve form data using the form id
     *
     * @param {*} formId - The id of the form
     * @param {*} bearerTokenCallback - A callback to access the bearerToken
     * @memberof EZForm
     */
    getFormData(formId, bearerTokenCallback) {
        //make request to the api using 
        // /ezform/SpOC_JA_tracker
        let http = new HTTPService({
            host: ""
        });
        http.read("https://localhost:8080/api/ezform/SpOC_JA_tracker", {}, this.onSuccess, this.onFailure, {});
        //if successful call formatData
        // this.formatData(responseData);

        //if unsuccessful handle error state
    }

    onSuccess(response) {
        console.log(response);
    }

    onFailure(response) {
        console.log(response);
    }

    //Convert data to a usable format
    formatData(data) {



        //Build out states

    }


    //Call factory that will take in a question and return a jsx element


    //On user submission validate the inputs


    //Send for data to the back end






    /**
     *Renders the returned JSX element
     * @returns {*} JSX element
     * @memberof EZForm
     */
    render() {
        return (
            <>
            </>
        );
    }

}

/** Prop Validators */
// EZForm.propTypes = {
//     formId: PropTypes.string.isRequired,
//     bearerTokenCallback: PropTypes.function.isRequired
// };

export default EZForm;

