/*
 * File: OneColumn
 * Version: 0.1.0
 * Project: react-test
 * Description: Component for rendering the contents passed to it in a single column
 * File Created: Friday, 29th January 2021 10:15 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Monday, 22nd February 2021 9:41 am
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Component for rendering the contents passed to it in a single column
 */
class OneColumn extends React.Component {

    /**
     * Creates an instance of the OneColumn class
     * @param {*} props - Props passed to this component
     */
    constructor(props) {
        super(props);
    }

    /**
     * Returns a OneColumn component
     *
     * @returns {*} - JSX return
     * @memberof OneColumn
     */
    render() {
        return (
            <Container className="single-column-container mb-5 mt-5">
                <Row>
                    <Col className="col-12 mb-5">
                        {this.props.column}
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default OneColumn;