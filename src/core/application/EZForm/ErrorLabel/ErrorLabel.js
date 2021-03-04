/*
 * File: /src/core/survey/ErrorLabel/ErrorLabel.js
 * Version: 0.0.3
 * Project: @siliconmtn/spacelibs-react
 * Description: ErrorLabel Component
 * File Created: Friday, 19th February 2021 9:56 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 5:02 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

/**
 * Error Label Component
 *
 * @param {*} props - Component props
 * @returns {*} Error Label 
 */
function ErrorLabel(props){
	return (
        <>
            <FormHelperText className={"error-label text-error"}>{props.errorMessage ? props.errorMessage : " "}</FormHelperText>
        </>
    );
}

ErrorLabel.propTypes = {
	errorMessage: PropTypes.string,
	isValid: PropTypes.bool
};

export default ErrorLabel;