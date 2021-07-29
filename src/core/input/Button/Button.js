/*
 * File: /src/core/input/Button/Button.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs Button class
 * File Created: Thursday, 11th February 2021 12:37 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 29th July 2021 11:28 am
 * Modified By: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';

/**
 * Button class
 */
class Button extends React.Component {
  /**
   * Creates an instance of Button.
   * @param {*} props - Button props
   * @memberof Button
   */
  constructor(props) {
    super(props);
  }

  /**
   * Renders the Button
   *
   * @returns {object} - Button elements
   * @memberof Button
   */
  render() {
    const { className, startIcon, endIcon, children, ...leftOver } = this.props;
    const testId = leftOver['data-testid'];
    delete leftOver['data-testid'];
    return (
      <MuiButton
        data-testid={`${testId}-button`}
        className={'sl-button ' + className}
        startIcon={startIcon ? startIcon : null}
        endIcon={endIcon ? endIcon : null}
        {...leftOver}>
        {children}
      </MuiButton>
    );
  }
}

/**
 * Default props
 */
Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  'data-testid': 'generic'
};

/**
 * Props this component takes
 */
Button.propTypes = {
  children: PropTypes.any,
  'data-testid': PropTypes.string,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  onClick: PropTypes.func,
  startIcon: PropTypes.any,
  endIcon: PropTypes.any,
  className: PropTypes.string
};

export default Button;
