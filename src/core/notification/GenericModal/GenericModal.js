/*
 * File: GenericModal.js
 * Version: 0.0.1
 * Project: spacelibs-react
 * Description: Template for a modal
 * File Created: Tuesday, 11th May 2021 12:26 pm
 * Author: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 11th May 2021 2:54 pm
 * Modified By: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "../../input/Button";
import HelpIcon from "@material-ui/icons/HelpRounded";
import InfoIcon from '@material-ui/icons/InfoRounded';
import WarningIcon from '@material-ui/icons/WarningRounded';
import ErrorIcon from '@material-ui/icons/ErrorRounded';

/**
 * Template for themed modals
 * 
 * @example
 * import Modal from '../GenericModal';
 * 
 * render() {
 *  return (
 *			<Modal
 *				titleIconName='help'
 *				title='Some title'
 *				show={this.state.show}
 *				onHide={this.handleOnHide}
 *				leftButtonOnClick={this.handleClose}
 *				rightButtonOnClick={this.handleSave}
 *			>
 *				// Your body here
 *			</Modal>
 *		);
 * }
 * @param {*} props settings for Modal and buttons
 * @returns {*} a custom bootstrap modal
 */
function GenericModal(props) {

    /**
     * Loads an icon if needed
     * Current icons are help, info, warning, and error
     * @returns {*} the selected icon
     */
    function loadIcon() {
        switch (props.titleIconName) {
            case "help":
                return <HelpIcon htmlColor='#2196f3' className='generic-modal-icon'/>;
            case "info":
                return <InfoIcon htmlColor='#2196f3' className='generic-modal-icon'/>;
            case "warning":
                return <WarningIcon htmlColor='#ff9800' className='generic-modal-icon'/>;
            case "error":
                return <ErrorIcon htmlColor='#d32f2f' className='generic-modal-icon'/>;
            default:
                return null;
        }
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            onShow={props.onShow}
            backdrop={props.backdrop}
            keyboard={props.keyboard}
            animation={props.isAnimated}
            centered={props.isCentered}
            size={props.size}
        >
            <Modal.Header>
                <Modal.Title>
                    {loadIcon()}
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                {props.showLeftButton &&
                    <Button
                    variant={props.leftButtonVariant}
                    className={props.leftButtonClassName}
                    color={props.leftButtonColor}
                    disabled={props.leftButtonIsDisabled}
                    startIcon={props.leftButtonStartIcon}
                    endIcon={props.leftButtonEndIcon}
                    onClick={props.leftButtonOnClick}
                >
                    {props.leftButtonLabel}
                </Button>
                }                
                <Button
                    variant={props.rightButtonVariant}
                    className={props.rightButtonClassName}
                    color={props.rightButtonColor}
                    disabled={props.rightButtonIsDisabled}
                    startIcon={props.rightButtonStartIcon}
                    endIcon={props.rightButtonEndIcon}
                    onClick={props.rightButtonOnClick}
                >
                    {props.rightButtonLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

GenericModal.defaultProps = {
    backdrop: 'static',
    isAnimated: true,
    isCentered: false,

    showLeftButton: true,
    leftButtonVariant: 'outlined',
    leftButtonClassName: 'mr-auto',
    leftButtonLabel: 'Close',

    rightButtonVariant: 'contained',
    rightButtonColor: 'primary',
    rightButtonLabel: 'Save',
};

GenericModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    backdrop: PropTypes.string,
    keyboard: PropTypes.bool,
    isAnimated: PropTypes.bool,
    isCentered: PropTypes.bool,
    size: PropTypes.string,
    titleIconName: PropTypes.string,
    title: PropTypes.string.isRequired,

    children: PropTypes.any,

    showLeftButton: PropTypes.bool,
    leftButtonVariant: PropTypes.string,
    leftButtonClassName: PropTypes.string,
    leftButtonColor: PropTypes.string,
    leftButtonIsDisabled: PropTypes.bool,
    leftButtonStartIcon: PropTypes.any,
    leftButtonEndIcon: PropTypes.any,
    leftButtonOnClick: PropTypes.func,
    leftButtonLabel: PropTypes.string,

    rightButtonVariant: PropTypes.string,
    rightButtonClassName: PropTypes.string,
    rightButtonColor: PropTypes.string,
    rightButtonIsDisabled: PropTypes.bool,
    rightButtonStartIcon: PropTypes.any,
    rightButtonEndIcon: PropTypes.any,
    rightButtonOnClick: PropTypes.func,
    rightButtonLabel: PropTypes.string
};

export default GenericModal;
