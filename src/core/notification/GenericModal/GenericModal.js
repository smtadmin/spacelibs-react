/*
 * File: GenericModal.js
 * Version: 0.0.1
 * Project: spacelibs-react
 * Description: Template for a modal
 * File Created: Tuesday, 11th May 2021 12:26 pm
 * Author: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 29th July 2021 11:31 am
 * Modified By: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from '../../input/Button';
import HelpIcon from '@material-ui/icons/HelpRounded';
import InfoIcon from '@material-ui/icons/InfoRounded';
import WarningIcon from '@material-ui/icons/WarningRounded';
import ErrorIcon from '@material-ui/icons/ErrorRounded';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useTheme } from '@material-ui/core/styles';

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
 * };
 * @param {*} props settings for Modal and buttons
 * @returns {*} a custom bootstrap modal
 */
const GenericModal = (props) => {
  const theme = useTheme();

  /**
   * Loads an icon if needed
   * Current icons are help, info, warning, and error
   * @returns {*} the selected icon
   */
  const loadIcon = () => {
    switch (props.titleIconName) {
      case 'help':
        return (
          <HelpIcon
            className="generic-modal-icon"
            css={css`
              color: ${theme.palette.primary.main};
            `}
          />
        );
      case 'info':
        return (
          <InfoIcon
            className="generic-modal-icon"
            css={css`
              color: ${theme.palette.primary.main};
            `}
          />
        );
      case 'warning':
        return (
          <WarningIcon
            className="generic-modal-icon"
            css={css`
              color: ${theme.palette.warning.main};
            `}
          />
        );
      case 'error':
        return (
          <ErrorIcon
            className="generic-modal-icon"
            css={css`
              color: ${theme.palette.error.main};
            `}
          />
        );
      default:
        return null;
    }
  };

  const backgroundColor = theme.palette.background.paper;

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      onShow={props.onShow}
      backdrop={props.backdrop}
      keyboard={props.keyboard}
      animation={props.isAnimated}
      centered={props.isCentered}
      data-testid={`${props['data-testid']}-modal`}
      size={props.size}>
      <Modal.Header
        closeButton={props.showX}
        data-testid={`${props['data-testid']}-modal-header`}
        css={css`
          background-color: ${backgroundColor};
          color: ${theme.palette.text.primary};
          .close {
            color: ${theme.palette.text.primary};
          }
        `}>
        <Modal.Title data-testid={`${props['data-testid']}-modal-title`}>
          {loadIcon()}
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        data-testid={`${props['data-testid']}-modal-body`}
        css={css`
          background-color: ${backgroundColor};
          color: ${theme.palette.text.primary};
        `}>
        {props.children}
      </Modal.Body>
      <Modal.Footer
        data-testid={`${props['data-testid']}-modal-footer`}
        css={css`
          background-color: ${backgroundColor};
        `}>
        {props.showLeftButton && (
          <Button
            variant={props.leftButtonVariant}
            className={props.leftButtonClassName}
            color={props.leftButtonColor}
            size={props.leftButtonSize}
            disabled={props.leftButtonIsDisabled}
            startIcon={props.leftButtonStartIcon}
            endIcon={props.leftButtonEndIcon}
            onClick={props.leftButtonOnClick}
            data-testid={`${props['data-testid']}-modal-left`}>
            {props.leftButtonLabel}
          </Button>
        )}
        {props.showRightButton && (
          <Button
            variant={props.rightButtonVariant}
            className={props.rightButtonClassName}
            color={props.rightButtonColor}
            size={props.rightButtonSize}
            disabled={props.rightButtonIsDisabled}
            startIcon={props.rightButtonStartIcon}
            endIcon={props.rightButtonEndIcon}
            onClick={props.rightButtonOnClick}
            data-testid={`${props['data-testid']}-modal-right`}>
            {props.rightButtonLabel}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

GenericModal.defaultProps = {
  backdrop: 'static',
  isAnimated: true,
  isCentered: false,
  showX: true,
  'data-testid': 'generic',

  showLeftButton: true,
  leftButtonVariant: 'outlined',
  leftButtonClassName: 'mr-auto',
  leftButtonLabel: 'Close',

  showRightButton: true,
  rightButtonVariant: 'contained',
  rightButtonColor: 'primary',
  rightButtonLabel: 'Save'
};

GenericModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  showX: PropTypes.bool,
  /**
   * Modal backdrop options, determines if the backdrop is greyed out (true) or not.
   * Setting to static prevents closing from an outside click
   *
   * One of ('static','true','false')
   */
  backdrop: PropTypes.oneOf(['static', 'true', 'false']),
  /**
   * Modal keyboard option to choose if esc closes a modal (true) or not
   */
  keyboard: PropTypes.bool,
  isAnimated: PropTypes.bool,
  isCentered: PropTypes.bool,
  'data-testid': PropTypes.string,
  /**
   * Modal size options
   *
   * One of ('sm','lg','xl')
   */
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
  /**
   * Name of the icon to use before the title
   *
   * Choose between 'help', 'info', 'warning', 'error'
   */
  titleIconName: PropTypes.oneOf(['help', 'info', 'warning', 'error']),
  title: PropTypes.string,

  children: PropTypes.any,

  showLeftButton: PropTypes.bool,
  /**
   * Button variant selection
   *
   * One of ('contained','outlined','text')
   */
  leftButtonVariant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  leftButtonClassName: PropTypes.string,
  leftButtonColor: PropTypes.string,
  /**
   * Button size options
   *
   * One of ('large','medium','small')
   */
  leftButtonSize: PropTypes.oneOf(['large', 'medium', 'small']),
  leftButtonIsDisabled: PropTypes.bool,
  leftButtonStartIcon: PropTypes.any,
  leftButtonEndIcon: PropTypes.any,
  leftButtonOnClick: PropTypes.func,
  leftButtonLabel: PropTypes.any,

  showRightButton: PropTypes.bool,
  /**
   * Button variant selection
   *
   * One of ('contained','outlined','text')
   */
  rightButtonVariant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  rightButtonClassName: PropTypes.string,
  rightButtonColor: PropTypes.string,
  /**
   * Button size options
   *
   * One of ('large','medium','small')
   */
  rightButtonSize: PropTypes.oneOf(['large', 'medium', 'small']),
  rightButtonIsDisabled: PropTypes.bool,
  rightButtonStartIcon: PropTypes.any,
  rightButtonEndIcon: PropTypes.any,
  rightButtonOnClick: PropTypes.func,
  rightButtonLabel: PropTypes.any
};

export default GenericModal;
