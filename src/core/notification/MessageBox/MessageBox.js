/*
 * File: /src/core/notification/MessageBox/MessageBox.js
 * Version: 0.0.1
 * Project: @siliconmtn/spacelibs-react
 * Description: Message Box modal to be used within a Layout.
 * File Created: Wednesday, 23rd February 2021 08:18pm
 * Author: James Camire (james@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 9:23 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col } from 'react-bootstrap';
import Button from '../../input/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);

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
        // return <FontAwesomeIcon icon={["far", "square"]} color="red" />;
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
                            size='lg'
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
    message : PropTypes.string,
	show : PropTypes.bool,
	onClose: PropTypes.func
};

export default MessageBox;