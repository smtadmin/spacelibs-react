/*
 * File: /src/core/input/DateField/DateField.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs date field tests
 * File Created: Wednesday, 10th February 2021 4:30 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 12th February 2021 3:15 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
*/
import DateField from './index';
import React from 'react';
import { render } from '@testing-library/react';
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

const blankProps = {
	value: [],
	onValueChanged: () => {},
	config: {
		options: [],
	},
};

const valueProps = {
	value: ["20000123T012345.678+0900"],
	onValueChanged: () => {},
	subText: "Error occurred",
	config: {
		options: [],
	},
};

/**
 * Checks that Date Field with basic props loads without error
 */
it("Renders without crashing", () => {
	const element = render(<DateField {...blankProps}/>);
	expect(element).toBeTruthy();

});

/**
 * Checks that Date Field renders when value is passed
 */
it("Renders without crashing when value exists", () => {
	const element = render(<DateField {...valueProps}/>);
	expect(element).toBeTruthy();
});

/**
 * Checks that the Date Field renders and updates values when input is cleared
 */
it("Renders without crashing after changing date value to blank", () => {

	const mockedFunction = jest.fn();
	const element = render(
    <DateField
      {...blankProps}
      value={["20000123T012345.678+0900"]}
      onValueChanged={mockedFunction}
    />
  );
	const inputParent = screen.getByTestId("date-input");
	const input = inputParent.children[0].children[0];

	userEvent.clear(input);

	expect(element).toBeTruthy();
	expect(mockedFunction).toHaveBeenCalled();
});

/**
 * Checks that the Date Field renders and updates values when new value is inputted
 */
it("Renders without crashing after changing date value to date", () => {

	const mockedFunction = jest.fn();
	const element = render(<DateField {...blankProps} onValueChanged={mockedFunction}/>);
	const inputParent = screen.getByTestId("date-input");
	const input = inputParent.children[0].children[0];

	userEvent.type(input, "10/20/2020");

	expect(element).toBeTruthy();
	expect(mockedFunction).toHaveBeenCalled();
});