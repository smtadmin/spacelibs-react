/*
 * File: /src/core/input/TextField/TextField.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs TextField tests
 * File Created: Thursday, 11th February 2021 12:08 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 11th February 2021 2:45 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import TextField from './TextField';
import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const blankProps = {
	identifier: "1",
	onValueChanged: ()=>{},
};

const valueProps = {
	identifier: "1",
	value: "Hello",
	onValueChanged: ()=>{},
};

const errorTextFieldProps = {
	identifier: "1",
	value: "Hello",
	onValueChanged: ()=>{},
	hasError: true,
	subText: "Error message"
};

/**
 * Checks that TextField renders with basic props
 */
it("Renders with basic props", ()=> {
	const element = render(<TextField {...blankProps}/>);
	expect(element).toBeTruthy();
	expect(element).toMatchSnapshot();
});

/**
 * Checks that TextField renders a value in the input when value is passed
 */
it("Renders with value prop", ()=> {
	const element = render(<TextField {...valueProps}/>);

	const inputParent = screen.getByTestId('textfield-input');
	const input = inputParent.children[0].children[0];

	expect(element).toBeTruthy();
	expect(input.value).toBe("Hello");
});

/**
 * Checks that TextField displays error message
 */
it("Renders with error props", ()=> {
	const element = render(<TextField {...errorTextFieldProps}/>);
	expect(element).toBeTruthy();
});

/**
 * Checks that onValueChanged is called when text is entered
 */
it("Calls onValueChanged when a user types in data", ()=> {
	const onValueChanged = jest.fn();
	const element = render(<TextField {...blankProps} onValueChanged={onValueChanged}/>);
	const inputParent = screen.getByTestId('textfield-input');
	const input = inputParent.children[0].children[0];
	
	userEvent.click(input);
	userEvent.type(input, "one");

	expect(element).toBeTruthy();
	expect(onValueChanged).toHaveBeenCalled();
});