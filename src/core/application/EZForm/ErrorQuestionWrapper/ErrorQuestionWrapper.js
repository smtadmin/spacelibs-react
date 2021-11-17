/*
 * File: /src/core/application/EZForm/ErrorQuestionWrapper/ErrorQuestionWrapper.js
 * Version: 1.0.31
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 16th August 2021 2:31 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 16th August 2021 2:38 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ErrorLabel from '../ErrorLabel';

/**
 * Error Question Wrapper Component
 *
 * @param {*} { errorMessage, children }
 * @returns {*} Component
 */
function ErrorQuestionWrapper({ errorMessage, children }) {
  return (
    <div>
      {children}
      {errorMessage && <ErrorLabel errorMessage={errorMessage}></ErrorLabel>}
    </div>
  );
}

ErrorQuestionWrapper.propTypes = {
  errorMessage: PropTypes.string,
  children: PropTypes.any
};

export default ErrorQuestionWrapper;
