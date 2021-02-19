/*
 * File: OneColumn
 * Version: 0.1.0
 * Project: react-test
 * Description: Component for rendering the contents passed to it in a single column
 * File Created: Friday, 29th January 2021 10:15 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Friday, 19th February 2021 11:33 am
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
     * @param {*} props 
     */
    constructor(props) {
        super();
    }

    /**
     * Returns a OneColumn component
     */
    render() {
        return (
            <Container className="single-column-container">
                <Row>
                    <Col className="col-12">
                        {this.props.column}
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default OneColumn;