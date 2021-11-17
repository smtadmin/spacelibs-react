/*
 * File: Header
 * Version: 0.1.0
 * Project: react-test
 * Description: Component that wraps and formats page header content
 * File Created: Friday, 29th January 2021 9:57 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 20th July 2021 2:44 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useTheme } from "@material-ui/core/styles";

/**
 * Header Component
 *
 * @param {*} props Component props
 * @returns {*} React component 
 */
function Header(props) {
	const theme = useTheme();

	return (
        <Navbar
            id='header-container'
            className={props.bootstrap}
            css={css`
                background-color: ${theme.palette.primary.mainOriginal};
            `}>
            <Col className='header-left col-2'>{props.left}</Col>
            <Col className='header-center col-8'>{props.center}</Col>
            <Col className='header-right col-2'>{props.right}</Col>
        </Navbar>
    );
}

/** Sets Default Props */
Header.defaultProps = {
    bootstrap: "header"
};
/** Prop Validators */
Header.propTypes = {
    left: PropTypes.any,
    center: PropTypes.any,
    right: PropTypes.any,
    bootstrap: PropTypes.string
};

export default Header;