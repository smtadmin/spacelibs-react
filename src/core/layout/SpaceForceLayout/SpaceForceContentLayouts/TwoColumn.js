/*
 * File: TwoColumn
 * Version: 0.1.0
 * Project: react-test
 * Description: Two column layout for Spaceforce content. It is defauled to a col-2 and col-10 that can be overriden with whatever bootstrap
 * you would like to specify when rendering the TwoColumn Component in your page
 * File Created: Wednesday, 3rd February 2021 3:56 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 5:08 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import BootstrapWrapper from '../BootstrapWrapper/BootstrapWrapper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Two column layout for Spaceforce content.
 */
class TwoColumn extends React.Component {

    /**
     * Creates an instance of the TwoColumn class
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.colOneBootstrap = (typeof props.colOneBootstrap === 'undefined') ? "col-2" : props.colOneBootstrap;
        this.colTwoBootstrap = (typeof props.colTwoBootstrap === 'undefined') ? "col" : props.colTwoBootstrap;
        this.state = {
            colOne : this.addKeys("colOne", this.props.colOne),
            colTwo : this.addKeys("colTwo", this.props.colTwo)
        }
    }

    /**
     * Adds unique keys to each of the content elements passted to it
     * @param {*} col Column Label
     * @param {*} columnContent Elements to be placed in the columns
     */
    addKeys(col, columnContent) {
        const newElements = [];
        let count = 0;

        if (Array.isArray(columnContent)) {
            for (const element of columnContent) {
                newElements.push(<div key={count}>{element}</div>);
                count++;
            }
        } else {
            newElements.push(<div key={count}>{columnContent}</div>);
        }

        return <BootstrapWrapper sectionName={col} content={newElements} />;
    }
  
    /**
     * Returns a TwoColumn Component
     */
    render() {
        return (
            <Container fluid className="two-column-container">
                <Row>
                    <Col key="col-1" className={"col-one " + this.colOneBootstrap}>
                        {this.state.colOne}
                    </Col>
                    <Col key="col-2" className={"col-two " + this.colTwoBootstrap}>
                        {this.state.colTwo}
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default TwoColumn;