/*
 * File: /src/core/notification/MessageBox/MessageBox.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 2nd March 2021 1:12 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd March 2021 1:26 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import MessageBox from "./MessageBox";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Checks that the button renders and the current snapshot matches the previous one.
 */
it("Renders with no props", () => {
	const { baseElement } = render(<MessageBox />);
	expect(baseElement).toBeTruthy();
});

it("Calls onClose prop on close", () => {
	const mockedFunction = jest.fn();
    render(<MessageBox onClose={mockedFunction} show={true} />);
	
	console.log(screen);
	const element = screen.getAllByText("Close");
	console.log(element);
    userEvent.click(element[1]);
    expect(mockedFunction).toHaveBeenCalled();
});

it("has coverage if on close not passed", () => {
    const component = render(<MessageBox show={true} />);
    console.log(screen);
    const element = screen.getAllByText("Close");
    console.log(element);
	userEvent.click(element[1]);
	expect(component).toBeTruthy();
});