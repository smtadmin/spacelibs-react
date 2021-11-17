/*
 * File: /src/core/input/TextField/TextField.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs TextField tests
 * File Created: Thursday, 11th February 2021 12:08 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 30th July 2021 4:34 pm
 * Modified By: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import TextField from './TextField';
import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const blankProps = {
  identifier: '1',
  onValueChanged: jest.fn()
};

const valueProps = {
  identifier: '1',
  value: 'Hello',
  onValueChanged: jest.fn()
};

const errorTextFieldProps = {
  identifier: '1',
  value: 'Hello',
  onValueChanged: jest.fn(),
  hasError: true,
  subText: 'Error message'
};

/**
 * Checks that TextField renders with basic props
 */
it('Renders with basic props', () => {
  const element = render(<TextField {...blankProps} />);
  expect(element).toBeTruthy();
  expect(element).toMatchSnapshot();
});

/**
 * Checks that TextField renders a value in the input when value is passed
 */
it('Renders with value prop', () => {
  const element = render(<TextField {...valueProps} />);

  const input = screen.getByTestId('generic-textfield-input');

  expect(element).toBeTruthy();
  expect(input.value).toBe(valueProps.value);
});

/**
 * Checks that TextField displays error message
 */
it('Renders with error props', () => {
  const element = render(<TextField {...errorTextFieldProps} />);
  expect(element).toBeTruthy();
});

/**
 * Checks that onValueChanged is called when text is entered
 */
it('Calls onValueChanged when a user types in data', () => {
  const onValueChanged = jest.fn();
  const element = render(
    <TextField {...blankProps} onValueChanged={onValueChanged} />
  );
  const input = screen.getByTestId('generic-textfield-input');

  userEvent.click(input);
  userEvent.type(input, 'one');

  expect(element).toBeTruthy();
  expect(onValueChanged).toHaveBeenCalled();
});
