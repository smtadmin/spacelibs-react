/*
 * File: /src/core/input/Tooltip/Tooltip.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs Tooltip tests
 * File Created: Thursday, 11th February 2021 9:13 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 12th February 2021 3:16 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import Tooltip from './Tooltip';
import React from 'react';
import { render } from '@testing-library/react';

/**
 * Checks that tooltip displays when test is passed
 */
it("Renders with tooltip data", () => {
	const element = render(<Tooltip text="Test"/>);
	expect(element).toBeTruthy();
	expect(element).toMatchSnapshot();
});

/**
 * Checks that tooltip renders when no text passed
 */
it("Renders without tooltip data", () => {
	const element = render(<Tooltip />);
	expect(element).toBeTruthy();
});