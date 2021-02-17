/*
 * File: Footer
 * Version: 0.1.0
 * Project: react-test
 * Description: Component that wraps and formats page footer content
 * File Created: Friday, 29th January 2021 9:57 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th February 2021 4:11 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Component that wraps and formats page footer content
 */
class Footer extends React.Component {

    /**
     * Creates an instance of the footer class
     * @param {*} props 
     */
    constructor(props) {
        super();
    }

    /**
     * Returns a footer component
     */
    render() {
        return (
                <Row className={this.props.bootstrap}>
                    <Col className="footer-left col-1">
                        {this.props.left}
                    </Col>
                    <Col className="footer-center col-10">
                        {this.props.center}
                    </Col>
                    <Col className="footer-right col-1">
                        {this.props.right}
                    </Col>
                </Row>
        )
    }

}

/** Sets Default Props */
Footer.defaultProps = {
    bootstrap: "footer"
};
/** Prop Validators */
Footer.propTypes = {
    left: PropTypes.any,
    center: PropTypes.any,
    right: PropTypes.any
};

export default Footer;