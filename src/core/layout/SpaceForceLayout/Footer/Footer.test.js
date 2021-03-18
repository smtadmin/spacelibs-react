/*
 * File: Footer.test
 * Version: 0.1.0
 * Project: react-test
 * Description: Testing Suite for the Footer component
 * File Created: Saturday, 6th February 2021 10:45 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th March 2021 11:46 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import Footer from './Footer';
import React from 'react';
import { render } from '@testing-library/react';

/**
 * Attempts to render the footer component with a object passed to it
 */
it("Renders without crashing", () => {
    const footerContent = {
        left: "left",
        Center: "center",
        right: "right"
    };
    const element = render(<Footer footer={footerContent} />);
    expect(element).toBeTruthy();
});

/**
 * Renders the footer component and compared it to a snapshot to confirm that output is consistent
 */
it("Renders correctly", () => {
    const footerContent = {
        left: "left",
        Center: "center",
        right: "right"
    };
    const element = render(<Footer footer={footerContent} />);
    expect(element).toMatchSnapshot();
});

/**
 * Passes arrays of element to each place in the footer component and compares it to a snapshot to confirm that the output is consistent
 */
it("Renders multiple items correctly", () => {
    const footerContent = {
        left: ["item1", "item2", "item3"],
        Center: ["item1", "item2", "item3"],
        right: ["item1", "item2", "item3"]
    };
    const element = render(<Footer footer={footerContent} />);
    expect(element).toMatchSnapshot();
});