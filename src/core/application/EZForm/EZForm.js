/*
 * File: EZForm
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: React component that displays a form using the EZForm api
 * File Created: Thursday, 18th February 2021 4:01 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 4th November 2021 12:33 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';
import HTTPService from '@siliconmtn/spacelibs-js/core/io/BaseHTTPService';
import EZFormSubmission from './EZFormSubmission';
import MessageBox from '../../notification/MessageBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { APIContext } from '../../api';
import copy from 'fast-copy';
import EZFormBase from './EZFormBase/EZFormBase';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { withTheme } from '@material-ui/core/styles';

const EZFormStatus = Object.freeze({
  loading: 'loading',
  failedToLoad: 'failedToLoad',
  inProgress: 'inProgress',
  submitting: 'submitting',
  submitted: 'submitted',
  redirect: 'redirect'
});

/**
 * React component that displays a form using the EZForm api
 */
class EZForm extends React.Component {
  /**
   * Creates an instance of the EZForm class
   * @param {*} props - The props passed to the component
   */
  constructor(props) {
    super(props);
    this.state = {
      status: EZFormStatus.loading,
      currentPage: 0,
      pageCount: 0,
      formErrorMessage: null,
      showModal: false,
      modalMessage: '',
      modalTitle: '',
      apiService: null
    };
  }

  /**
   * Lifecycle method that gets called when the component mounts
   *
   * @memberof EZForm
   */
  componentDidMount() {
    this.getFormData(this.props.formId);
  }

  /**
   * Method to get an HTTPService
   *
   * @returns {*} an HTTPServiceObject
   * @memberof EZForm
   */
  getHTTPService() {
    if (this.context) {
      return new HTTPService({
        host: this.context.baseURL
      });
    } else {
      return new HTTPService({
        host: 'http://something'
      });
    }
  }

  /**
   *Makes a request to the EZForm api to retrieve form data using the form id
   *
   * @param {*} uriPath - The id of the form
   * @memberof EZForm
   */
  getFormData(uriPath) {
    let http = this.getHTTPService();
    let prevState = copy(this.state);
    prevState.apiService = http;
    this.setState(prevState);
    http.read('/api/form/' + uriPath, {}, this.onComplete.bind(this), {});
  }

  /**
   * This method is called when API request to get data is complete
   *
   * @param {*} response The response object from the APIService
   * @memberof EZForm
   */
  onComplete(response) {
    let data;
    let status = EZFormStatus.failedToLoad;
    let passedData = {};

    if (response.isValid) {
      data = response.data;
      status = EZFormStatus.inProgress;
    } else if (response.status === 'GONE') {
      status = EZFormStatus.redirect;
      passedData = response.message;
    }
    this.setState(
      {
        status: status,
        data: data,
        formErrorMessage: null,
        showModal: false,
        modalMessage: '',
        modalTitle: ''
      },
      () => this.props.stateCallback?.(status, passedData)
    );
  }

  /**
   *Prompts a modal to pop up
   *
   * @param {*} title title to add to the modal
   * @param {*} message message to add to the modal
   * @memberof EZForm
   */
  prompt(title, message) {
    let prevState = copy(this.state);
    prevState.showModal = true;
    prevState.modalMessage = message;
    prevState.modalTitle = title;
    this.setState(prevState);
  }

  /**
   * Method called when the submit button is pressed
   *
   * @param {*} responseData - Formatted Response Data
   * @memberof EZForm
   */
  onSubmit(responseData) {
    let prevState = copy(this.state);
    prevState.status = EZFormStatus.submitting;
    this.props.stateCallback?.(EZFormStatus.submitting);
    this.setState(prevState);
    this.sendData(responseData);
  }

  /**
   * Method called after submission and validation is done successfully
   *
   * @param {*} responseData - Response Data
   * @memberof EZForm
   */
  sendData(responseData) {
    this.state.apiService.insert(
      '/api/response/create/' + this.state.data.uriPath,
      responseData,
      {},
      (response) => {
        let prevState = copy(this.state);
        prevState.status = response.isValid
          ? EZFormStatus.submitted
          : EZFormStatus.inProgress;
        this.props.stateCallback?.(prevState.status);
        this.setState(prevState);

        if (!response.isValid) {
          this.prompt(
            'Something went wrong',
            'An error occured, please try submitting again.'
          );
        }
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  /**
   * Method called when a prompted modal is closed
   *
   * @memberof EZForm
   */
  onCloseModal() {
    let prevState = copy(this.state);
    prevState.showModal = false;
    prevState.modalMessage = '';
    this.setState(prevState);
  }

  /**
   *Renders the returned JSX element
   * @returns {*} JSX element
   * @memberof EZForm
   */
  render() {
    let output = null;

    if (this.state.status === EZFormStatus.loading) {
      output = (
        <div className='justify-content-center text-center'>
          <CircularProgress color='primary' />
        </div>
      );
    } else if (this.state.status === EZFormStatus.failedToLoad) {
      output = <div>404 Couldn&apos;t find form {this.props.formId}</div>;
    } else if (this.state.status === EZFormStatus.submitting) {
      output = (
        <div
          css={css`
            color: ${this.props.theme.palette.text.secondary};
          `}
          className='justify-content-center text-center'
        >
          <h1>Submitting</h1>
          <CircularProgress color='primary' />
        </div>
      );
    } else if (this.state.status === EZFormStatus.redirect) {
      output = (
        <div>
          404 Couldn&apos;t find form {this.props.formId}, it may have moved
        </div>
      );
    } else if (this.state.status === EZFormStatus.submitted) {
      output = (
        <EZFormSubmission
          uriPath={this.state.data.uriPath}
          resubmit={this.state.data.resubmitFlag}
          text={this.state.data.submissionText}
        />
      );
    }

    return (
      <>
        {output}
        {(this.state.status === EZFormStatus.inProgress ||
          this.state.status === EZFormStatus.submitting) && (
          <div
            style={{
              display:
                this.state.status === EZFormStatus.inProgress
                  ? 'inline'
                  : 'none'
            }}
          >
            <EZFormBase
              unformattedFormData={this.state.data}
              onSubmit={this.onSubmit.bind(this)}
            />
          </div>
        )}
        <MessageBox
          key={this.state.showModal}
          show={this.state.showModal}
          message={this.state.modalMessage}
          title={this.state.modalTitle}
          onClose={this.onCloseModal.bind(this)}
        />
      </>
    );
  }
}

EZForm.propTypes = {
  formId: PropTypes.string,
  stateCallback: PropTypes.func
};

EZForm.contextType = APIContext;

export default withTheme(EZForm);
