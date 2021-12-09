/*
 * File: /src/core/input/SelectField/SelectField.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Select Field tests
 * File Created: Wednesday, 10th February 2021 5:25 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 8th December 2021 2:21 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import SelectField from './SelectField';
import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const blankProps = {
  identifier: '1',
  value: [],
  config: {
    options: []
  },
  onValueChanged: () => {}
};

const options = [
  {
    identifier: '1',
    displayText: 'one'
  },
  {
    identifier: '2',
    displayText: 'two'
  },
  {
    identifier: '3',
    displayText: 'three'
  }
];

/**
 * Checks that the select field renders without any values or options
 */
it('Renders without any options or value', () => {
  const elementSingleSelect = render(<SelectField {...blankProps} />);
  const elementMultiSelect = render(
    <SelectField {...blankProps} config={{ options: [], isMultiple: true }} />
  );

  expect(elementSingleSelect).toBeTruthy();
  expect(elementMultiSelect).toBeTruthy();
});

/**
 * Checks that the select field renders with only options
 */
it('Renders with options only', () => {
  const element = render(
    <SelectField {...blankProps} config={{ options: options }} />
  );

  expect(element).toBeTruthy();
});

/**
 * Checks that the select field can render with only a value
 */
it('Renders with value only', () => {
  const element = render(<SelectField {...blankProps} value={[options[0]]} />);

  const inputParent = screen.getByTestId('generic-select');
  const input = inputParent.children[0].children[0].children[0];

  expect(element).toBeTruthy();
  expect(input.value).toBe(options[0].displayText);
});

/**
 * Checks single select field renders with value and options
 */
it('Renders with value and options | Single Selection', () => {
  const element = render(
    <SelectField
      {...blankProps}
      value={[options[0]]}
      config={{ options: options }}
    />
  );

  const inputParent = screen.getByTestId('generic-select');

  const button = inputParent.children[0].children[0].children[1].children[0];
  userEvent.click(button);

  expect(element).toBeTruthy();
});

/**
 * Checks multi select field renders with values and options
 */
it('Renders with value and options | Multi Selection', () => {
  const element = render(
    <SelectField
      {...blankProps}
      isMultiple={true}
      value={[options[0]]}
      config={{ options: options, isMultiple: true }}
    />
  );

  expect(element).toBeTruthy();
});

/**
 * Checks the single select field renders when option is selected
 */
it("Doesn't crash when an option is selected | Single Select", () => {
  const mockValueChanged = jest.fn();

  const element = render(
    <SelectField
      {...blankProps}
      config={{ options: options }}
      onValueChanged={mockValueChanged}
    />
  );

  const inputParent = screen.getByTestId('generic-select');
  const input = inputParent.children[0].children[0].children[0];

  userEvent.click(input);
  userEvent.type(input, 'one');

  const popper = screen.getAllByTestId('select-option');
  const option = popper[0].parentElement.parentElement;

  userEvent.click(option);

  expect(element).toBeTruthy();
  expect(mockValueChanged).toHaveBeenCalled();
});

/**
 * Checks the multi select field renders when option is selected
 */
it("Doesn't crash when an option is selected | Multi Select", () => {
  const mockValueChanged = jest.fn();

  const element = render(
    <SelectField
      {...blankProps}
      isMultiple={true}
      config={{ options: options, isMultiple: true }}
      onValueChanged={mockValueChanged}
    />
  );

  const inputParent = screen.getByTestId('generic-select');
  const input = inputParent.children[0].children[0].children[0];

  userEvent.click(input);
  userEvent.type(input, 'one');

  const popper = screen.getAllByTestId('select-option');
  const option = popper[0].parentElement.parentElement;

  userEvent.click(option);

  expect(element).toBeTruthy();
  expect(mockValueChanged).toHaveBeenCalled();
});

/**
 * Checks the single select field renders properly without options
 */
it("Doesn't crash when clicked without options | Single Select", () => {
  const mockValueChanged = jest.fn();

  const element = render(
    <SelectField
      {...blankProps}
      config={{ options: options }}
      onValueChanged={mockValueChanged}
    />
  );

  const inputParent = screen.getByTestId('generic-select');
  const input = inputParent.children[0].children[0].children[0];

  const selection = 'one';

  userEvent.click(input);
  userEvent.type(input, selection);

  expect(element).toBeTruthy();
  expect(input.value).toBe(selection);
});

/**
 * Checks the multi select field renders properly without options
 */
it("Doesn't crash when clicked without options | Multiple Select", () => {
  const mockValueChanged = jest.fn();

  const element = render(
    <SelectField
      {...blankProps}
      isMultiple={true}
      config={{ options: options, isMultiple: true }}
      onValueChanged={mockValueChanged}
    />
  );

  const inputParent = screen.getByTestId('generic-select');
  const input = inputParent.children[0].children[0].children[0];

  const selection = 'one';

  userEvent.click(input);
  userEvent.type(input, selection);

  expect(element).toBeTruthy();
  expect(input.value).toBe(selection);
});
