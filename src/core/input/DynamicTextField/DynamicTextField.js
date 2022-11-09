/*
 * File: /src/page/Admin/Questions/DynamicTextField/DynamicTextField.js
 * Version: 0.0.1
 * Project: ezform-webapp
 * Description: Dynamic Text Field
 * File Created: Friday, 14th May 2021 4:03 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 1st November 2021 10:31 am
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';

/** Styles */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useTheme } from '@material-ui/core/styles';

/**
 * Dynamic TextField component
 *
 * @param {*} props Component props
 * @returns {*} React element
 */
function DynamicTextField(props) {
  const palette = useTheme().palette;
  const testid = `${props['data-testid']}-dynamic`;
  const labelid = testid + '-label';

  if (props.isEditing) {
    return (
      <div className={'dynamic-label ' + props.className} data-testid={labelid}>
        <TextField
          maxLength={props.maxLength}
          data-testid={testid}
          multiline={props.multiline}
          hasError={props.hasError}
          subText={props.subText}
          inputProps={{
            style: {
              fontSize: props.fontSize + 'px'
            }
          }}
          autoFocus
          className={'input'}
          onValueChanged={(text) => {
            props.callbacks.onChange(props.identifier, text);
          }}
          onFocus={(event) => {
            if (props.selectOnFocus) event.target.select();
          }}
          onBlur={() => {
            props.callbacks.onBlur(props.identifier);
          }}
          value={props.value}
        />
      </div>
    );
  } else if (props.canEdit) {
    return (
      <div
        tabIndex={0}
        onFocus={() => {
          props.callbacks.onFocus(props.identifier);
        }}
        style={{
          fontSize: props.fontSize,
          height: props.fontSize + props.bottomBarOffset + 'px'
        }}
        onClick={() => {
          props.callbacks.onFocus(props.identifier);
        }}
        className={'dynamic-label text can-edit ' + props.className}
        css={css`
          color: ${palette.text.primary};
          border-color: ${palette.background.divider};
        `}
        data-testid={labelid}
      >
        {props.value}
      </div>
    );
  } else {
    return (
      <div
        className={'dynamic-label text ' + props.className}
        data-testid={labelid}
        style={{
          fontSize: props.fontSize,
          height: props.fontSize + props.bottomBarOffset + 'px'
        }}
        css={css`
          color: ${palette.text.primary};
          border-color: ${palette.background.divider};
        `}
      >
        {props.value}
      </div>
    );
  }
}

DynamicTextField.defaultProps = {
  fontSize: 16,
  bottomBarOffset: 10,
  className: '',
  'data-testid': 'generic'
};

DynamicTextField.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  subText: PropTypes.string,
  fontSize: PropTypes.number,
  bottomBarOffset: PropTypes.number,
  'data-testid': PropTypes.string,
  multiline: PropTypes.bool,
  maxLength: PropTypes.number,
  canEdit: PropTypes.bool,
  isEditing: PropTypes.bool,
  identifier: PropTypes.string,
  selectOnFocus: PropTypes.bool,
  callbacks: PropTypes.shape({
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
  })
};

export default DynamicTextField;
