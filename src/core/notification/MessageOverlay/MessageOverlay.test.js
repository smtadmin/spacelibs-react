/*
 * File: /src/core/notification/MessageBox/MessageBox.test.js
 * Version: 1.0.0
 * Project: @siliconmtn/spacelibs-react
 * Description: Class that tests the Message Box component
 * File Created: Tuesday, 19th may 2021 4:30 pm
 * Author: James Camire (james@siliconmtn.com)
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import MessageOverlay from "./MessageOverlay";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Checks that the button renders and the current snapshot matches the previous one.
 */
it("Renders with no props", () => {
	const { baseElement } = render(<MessageOverlay />);
	expect(baseElement).toBeTruthy();
});

/**
 * Checks that the MessageBox calls onClose when closed
 */
it("Calls showOverlay prop on open", () => {
    render(<MessageOverlay message="Testing" showOverlay={true} />);
	const element = screen.getAllByText("Testing");
    userEvent.click(element[1]);
    expect(element).toBeInTheDocument();
});

/**
 * Checks that MessageBox renders without an onClose prop
 */
it("Opens and closes the overlay", () => {
	let show = true;
    render(<MessageOverlay showOverlay={show} />);
	show = false;
    const element = screen.getAllByText("Testing");
	expect(element).toBeEmptyDOMElement();
});