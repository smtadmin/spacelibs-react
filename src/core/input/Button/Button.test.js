/*
 * File: /src/core/input/Button/Button.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs button class tests
 * File Created: Thursday, 11th February 2021 12:37 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 11th February 2021 2:11 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import Button from './Button';
import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';

import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

/**
 * Checks that the button renders and the current snapshot matches the previous one.
 */
it("Renders with no props", ()=> {
	const element = render(<Button />);
	expect(element).toBeTruthy();

	expect(element).toMatchSnapshot();
});

/**
 * Checks that onClick is called when the button is clicked
 */
it("Calls onClick function when clicked", () => {
	const mockedFunction = jest.fn();

	const element = render(<Button onClick={mockedFunction}/>);
	const inputParent = screen.getByTestId('button');
	
	userEvent.click(inputParent);

	expect(element).toBeTruthy();
	expect(mockedFunction).toHaveBeenCalled();
});

/**
 * Checks that when data is passed to a button, that it displays it as text
 */
it("Renders with text", ()=> {
	render(<Button>Something</Button>);

	const inputParent = screen.getByTestId('button');

	expect(inputParent.textContent).toBe("Something");
});