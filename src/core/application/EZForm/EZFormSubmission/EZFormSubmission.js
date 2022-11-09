/*
 * File: /src/core/application/EZForm/EZFormSubmission/EZFormSubmission.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Component to display the submission screen
 * File Created: Wednesday, 28th April 2021 9:27 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 16th March 2022 9:36 am
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import SMTButton from '../../../input/Button';
import CheckCircle from '@material-ui/icons/CheckCircle';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useTheme } from '@material-ui/core/styles';

const marketingSlug = (palette) => (
  <>
    <div
      css={css`
        color: ${palette.text.secondary};
        margin-top: 20px;
      `}
    >
      Interested in making your own secure forms with EZForm?{' '}
    </div>
    <div>
      Contact the SMT Team to get started here{' '}
      <a href='https://chat.il4.dso.mil/ez-forms/'>
        https://chat.il4.dso.mil/ez-forms/
      </a>
    </div>
  </>
);

/**
 * EZFormSubmission component
 *
 * @param {*} {text, resubmit, formId} - Component props
 * @returns {*} React element
 */
function EZFormSubmission({ text, resubmit, uriPath }) {
  const palette = useTheme().palette;
  return (
    <div
      className='submission-text text-center'
      css={css`
        color: ${palette.text.secondary};
      `}
    >
      <span style={{ fontSize: '60px' }}>
        <CheckCircle fontSize='inherit' htmlColor={'#4fad52'} />
      </span>
      <h1>Thanks!</h1>
      <h1>You&apos;re all set.</h1>
      <h3>{text}</h3>
      {resubmit && (
        <SMTButton
          className={'resubmit-button'}
          color={'secondary'}
          onClick={() => {
            window.location = '/form/' + uriPath;
          }}
        >
          Submit Another Response
        </SMTButton>
      )}
      {marketingSlug(palette)}
    </div>
  );
}

EZFormSubmission.defaultProps = {
  text: 'The form has successfully been submitted.'
};

EZFormSubmission.propTypes = {
  text: PropTypes.string,
  resubmit: PropTypes.bool.isRequired,
  uriPath: PropTypes.string
};

export default EZFormSubmission;
