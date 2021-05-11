/*
 * File: /src/core/application/EZForm/EZFormSubmission/EZFormSubmission.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Component to display the submission screen 
 * File Created: Wednesday, 28th April 2021 9:27 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Sunday, 2nd May 2021 1:17 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import SMTButton from "../../../input/Button";
import CheckCircle from "@material-ui/icons/CheckCircle";

/**
 * EZFormSubmission component
 *
 * @param {*} {text, resubmit, formId} - Component props
 * @returns {*} React element
 */
function EZFormSubmission({text, resubmit, formId}){
	return (
        <div className='submission-text text-center'>
            <span style={{ fontSize: "60px" }}>
                <CheckCircle fontSize='inherit' htmlColor={"#4fad52"} />
            </span>
            <h1>Thanks!</h1>
            <h1>You&apos;re all set.</h1>
            <h3>{text}</h3>
            {resubmit && (
                <SMTButton
                    className={"resubmit-button"}
                    color={"secondary"}
                    onClick={() => {
                        window.location = "/form/" + formId;
                    }}>
                    Submit Another Response
                </SMTButton>
            )}
        </div>
    );
}

EZFormSubmission.defaultProps = {
    text: "The form has successfully been submitted."
};

EZFormSubmission.propTypes = {
	text: PropTypes.string,
	resubmit: PropTypes.bool.isRequired,
	formId: PropTypes.string
};

export default EZFormSubmission;