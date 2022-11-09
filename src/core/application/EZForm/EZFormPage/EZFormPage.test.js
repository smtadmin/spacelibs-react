/*
 * File: /src/core/application/EZForm/EZFormPage/EZFormPage.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Test class for EZFormPage
 * File Created: Monday, 1st March 2021 4:02 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 9th December 2021 12:04 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import EZFormPage from './EZFormPage';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * Checks that the EZFormPage renders with no props
 */
it('Renders with no props', () => {
  const { baseElement } = render(<EZFormPage />);
  expect(baseElement).toBeTruthy();
});

/**
 * Checks that the EZFormPage renders normal props passed
 */
it('Renders with with valid questions', () => {
  const props = {
    onValueChanged: () => {},
    questions: [
      {
        type: 'ENTRY',
        identifier: 'FJIDSLKSDJS',
        dataType: {
          code: 'TEXT'
        },
        label: 'Question label',
        number: 1
      },
      {
        type: 'ENTRY',
        identifier: 'FJIDSLKSDJG',
        dataType: {
          code: 'TEXT'
        },
        label: 'Question label',
        number: 2
      }
    ]
  };
  const { baseElement } = render(<EZFormPage {...props} />);
  expect(baseElement).toBeTruthy();
});

/**
 * Checks that the EZFormPage handles new normal props
 */
it('Throws error with invalid questions', () => {
  const props = {
    onValueChanged: () => {},
    questions: [
      {
        identifier: 'FJIDSLKSDJS',
        dataType: {
          code: 'text'
        },
        label: 'Question label',
        number: 1
      },
      {
        identifier: 'FJIDSLKSDJG',
        dataType: {
          code: 'blah blah'
        },
        label: 'Question label',
        number: 2
      }
    ]
  };

  expect(() => render(<EZFormPage {...props} />)).toThrow(
    `Couldn't find a config type for {type: undefined, dataType: text}`
  );
});
