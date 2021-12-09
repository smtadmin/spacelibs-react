/*
 * File: /src/core/application/EZForm/RadioBlock/RadioBlock.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Class to test RadioBlock
 * File Created: Tuesday, 2nd March 2021 12:42 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 8th December 2021 2:06 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

/* eslint react/prop-types: 0 */

import RadioBlock from './RadioBlock';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../../../input/RadioGroup', () => {
  return function RadioGroup(props) {
    props.onValueChanged(1);
    props.onValueChanged([]);
    return <div></div>;
  };
});

const normalProps = {
  label: 'What is your birthday',
  number: 1,
  value: [
    {
      identifier: 'A',
      displayText: 'Option A',
      isSelected: undefined,
      isDisabled: undefined
    },
    {
      identifier: 'B',
      displayText: 'Option B',
      isDisabled: false
    }
  ],
  identifier: '1',
  onValueChanged: () => {},
  config: {
    options: [
      {
        identifier: 'A',
        displayText: 'Option A',
        isSelected: undefined,
        isDisabled: undefined
      },
      {
        identifier: 'B',
        displayText: 'Option B',
        isDisabled: false
      }
    ]
  }
};

/**
 * Checks that RadioBlock renders with normal props
 */
it('Renders with no props', () => {
  const { baseElement } = render(<RadioBlock {...normalProps} />);
  expect(baseElement).toBeTruthy();
});
