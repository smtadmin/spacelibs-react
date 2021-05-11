/*
 * File: /src/core/notification/MessageBox/MessageBox.js
 * Version: 0.0.1
 * Project: @siliconmtn/spacelibs-react
 * Description: Message Box modal to be used within a Layout.
 * File Created: Wednesday, 23rd February 2021 08:18pm
 * Author: James Camire (james@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th March 2021 10:21 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../../input/Button';

/**
 * 
 */
class MessageBox extends React.Component {
    /**
     * Constructor for the messgae box class
     * @param {*} props - MessageBox props
     */
    constructor(props) {
		super(props);
        this.state = {
            show : props.show,
            title : props.title,
            message : props.message,
            level : props.level
		};
	}
	
	/**
	 * Method called when modal is closed
	 *
	 * @memberof MessageBox
	 */
	onClose(){
		let oldState = this.state;
		oldState.show = false;
		this.setState(oldState);
		if(this.props.onClose){
			this.props.onClose();
		}
	}

    /**
     * Grabs the correct font awesome icon for the given level
     * @returns {*} Font Awesome Icon
     */
    getIcon() {
		return null;
    }

    /**
     * Render the modal
     * @returns {*} Modal to display as a message box
     */
    render() {
        return (
            <div>
                <Modal
                    show={this.state.show}
                    onHide={this.onClose.bind(this)}
                    backdrop='static'
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.getIcon()} {this.state.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>{this.state.message}</Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant='outlined'
                            color='default'
                            onClick={this.onClose.bind(this)}
                            size='large'
                            style={{ paddingRight: "10px" }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

/**
 * Default Props
 */
MessageBox.defaultProps = {
    title: "Some Message Here",
    level: "info",
    show : false
};

/**
 * Accepted Props
 */
MessageBox.propTypes = {
    title: PropTypes.string,
    level: PropTypes.oneOf(["error", "warning", "info"]),
    message : PropTypes.any,
	show : PropTypes.bool,
	onClose: PropTypes.func
};

export default MessageBox;