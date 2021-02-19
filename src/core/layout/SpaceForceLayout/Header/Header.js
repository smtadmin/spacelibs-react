/*
 * File: Header
 * Version: 0.1.0
 * Project: react-test
 * Description: Component that wraps and formats page header content
 * File Created: Friday, 29th January 2021 9:57 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Friday, 19th February 2021 11:17 am
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import { Navbar, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Component that wraps and formats page header content
 */
class Header extends React.Component {

    /**
     * Creates an instance of the Header Class
     * @param {*} props 
     */
    constructor(props) {
        super();
    }

    /**
     * Returns a Header Component
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
    right: PropTypes.any
};

export default Header;