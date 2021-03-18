/*
 * File: Header
 * Version: 0.1.0
 * Project: react-test
 * Description: Component that wraps and formats page header content
 * File Created: Friday, 29th January 2021 9:57 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th March 2021 11:45 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

/**
 * Component that wraps and formats page header content
 */
class Header extends React.Component {

    /**
     * Creates an instance of the Header Class
     * @param {*} props Header Props
     */
    constructor(props) {
        super(props);
    }

	/**
	 * Renders Header Component
	 *
	 * @returns {*} React Components 
	 * @memberof Header
	 */
	render() {
        return (
            <Navbar id="header-container" className={this.props.bootstrap}>
                <Col className="header-left col-1">
                    {this.props.left}
                </Col>
                <Col className="header-center col-10">
                    {this.props.center}
                </Col>
                <Col className="header-right col-1">
                    {this.props.right}
                </Col>
            </Navbar>
        );
    }
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