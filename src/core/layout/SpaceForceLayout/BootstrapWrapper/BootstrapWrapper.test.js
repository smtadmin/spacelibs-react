/*
 * File: BootstrapWrapper.test
 * Version: 0.1.0
 * Project: react-test
 * Description: Testing Suite for the Bootstrap Wrapper Component
 * File Created: Saturday, 6th February 2021 10:17 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th February 2021 3:05 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import BootstrapWrapper from './BootstrapWrapper';
import React from 'react';
import { render } from '@testing-library/react';

/**
 * Attempts to wrap a div without crashing
 */
it("Renders without crashing", () => {
    const element = render(<BootstrapWrapper sectionName="hello-world" content={<div>Hello World</div>} />)
    expect(element).toBeTruthy();
});


/**
 * Renders a div element and compares the html output to the stored snapshot
 */
it("Renders Correctly", () => {
    const element = render(<BootstrapWrapper sectionName="hello-world" content={<div>Hello World</div>} />)
    expect(element).toMatchSnapshot();
})

/**
 * Renders an array of divs and compares the html output to the stored snapshot
 */
it("Renders Multiple Elements Correctly", () => {
    const element = render(<BootstrapWrapper sectionName="hello-world" content={[<div>Element1</div>, <div>Element2</div>, <div>Element3</div>]} />)
    expect(element).toMatchSnapshot();
})
