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

/**
 * Checks that the button renders and the current snapshot matches the previous one.
 */
it("Renders with no props", () => {
	const { baseElement } = render(<MessageOverlay />);
	expect(baseElement).toBeTruthy();
});

/**
 * Checks that the button renders and the current snapshot matches the previous one.
 */
 it("Renders with no props with children", () => {
	const { baseElement } = render(<MessageOverlay >Testing</MessageOverlay>);
	expect(baseElement).toBeTruthy();
});

/**
 * Checks that the button renders and the current snapshot matches the previous one.
 */
 it("Renders with props no animation", () => {
	let props = {
		emptyAnimation : true,
		showOverlay : true,
		message : "Testing"
	};
	const { baseElement } = render(<MessageOverlay {...props} />);
	expect(baseElement).toBeTruthy();
});

/**
 * Checks that the button renders and the current snapshot matches the previous one.
 */
 it("Renders with props secondary color", () => {
	let props = {
		showOverlay : true,
		message : "Testing",
		color: "secondary"
	};
	const { baseElement } = render(<MessageOverlay {...props} />);
	expect(baseElement).toBeTruthy();
});

/**
 * Checks that the MessageBox calls onClose when closed
 */
it("Calls showOverlay prop on open", () => {
    render(<MessageOverlay message="Testing" showOverlay={true} />);
	const element = screen.getAllByText("Testing");
    expect(element).toBeTruthy();
});

/**
 * Checks that MessageBox renders without an onClose propnpm run test:unit
 */
it("Opens and closes the overlay", () => {
	let props = {
		emptyAnimation : false,
		showOverlay : true,
		message : "Testing"
	};

    const { rerender } = render(<MessageOverlay {...props} />);
	let element = screen.getAllByText("Testing");
	expect(element).toBeTruthy();

	props.showOverlay = false;
	rerender(<MessageOverlay {...props} />);

    element = screen.getAllByText("Testing");
	expect(element).toBeTruthy();
});