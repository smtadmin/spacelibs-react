/*
 * File: Header.test
 * Version: 0.1.0
 * Project: react-test
 * Description: INSERT DESCRIPTION
 * File Created: Saturday, 6th February 2021 10:55 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th February 2021 3:08 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import Header from './Header';
import React from 'react';
import { render } from '@testing-library/react';

/**
 * Attempts to render the header component with a object passed to it
 */
it("Renders without crashing", () => {
    const headerContent = {
        left: "left",
        Center: "center",
        right: "right"
    }
    const element = render(<Header header={headerContent} />)
    expect(element).toBeTruthy();
});

/**
 * Renders the header component and compared it to a snapshot to confirm that output is consistent
 */
it("Renders correctly", () => {
    const headerContent = {
        left: "left",
        Center: "center",
        right: "right"
    }
    const element = render(<Header header={headerContent} />)
    expect(element).toMatchSnapshot();
});

/**
 * Passes arrays of element to each place in the header component and compares it to a snapshot to confirm that the output is consistent
 */
it("Renders multiple items correctly", () => {
    const headerContent = {
        left: ["item1", "item2", "item3"],
        Center: ["item1", "item2", "item3"],
        right: ["item1", "item2", "item3"]
    }
    const element = render(<Header header={headerContent} />)
    expect(element).toMatchSnapshot();
});