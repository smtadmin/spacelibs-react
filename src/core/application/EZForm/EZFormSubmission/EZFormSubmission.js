/*
 * File: /src/core/application/EZForm/EZFormSubmission/EZFormSubmission.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Wednesday, 28th April 2021 9:27 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 28th April 2021 9:33 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import SMTButton from "../../../input/Button";
import CheckCircle from "@material-ui/icons/CheckCircle";

function EZFormSubmission(props){
	return (
        <div className='submission-text text-center'>
            <span style={{ fontSize: "60px" }}>
                <CheckCircle fontSize='inherit' htmlColor={"#4fad52"} />
            </span>
            <h1>Thanks!</h1>
            <h1>You&apos;re all set.</h1>
            <h3>{props.text}</h3>
            {props.resubmit && (
                <SMTButton
                    className={"resubmit-button"}
                    color={"secondary"}
                    onClick={() => {
                        window.location = "/form/" + this.props.formId;
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
	resubmit: PropTypes.bool.isRequired
};

export default EZFormSubmission;