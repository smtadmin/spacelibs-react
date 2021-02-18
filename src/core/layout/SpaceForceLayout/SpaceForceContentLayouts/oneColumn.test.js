/*
 * File: oneColumn.test
 * Version: 0.1.0
 * Project: react-test
 * Description: Testing suite for the SpaceForceContentLayout OneColumn Layout
 * File Created: Monday, 8th February 2021 12:30 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Friday, 12th February 2021 9:14 am
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import OneColumn from './OneColumn';
import React from 'react';
import { render } from '@testing-library/react';

/**
 * It renders the OneColumn element without crashing
 */
it("Renders without crashing", () => {

    const element = render(<OneColumn  />);
    expect(element).toBeTruthy();

});

/**
 * It renders a single element into the OneColumn layout correctly
 */
it("Renders The Layout Correctly With One Element", () => {

    const element = render(<OneColumn colOne={<div>Hello World</div>} />);
    expect(element).toMatchSnapshot();
})

/**
 * It renders multiple elements into the OneColumn layout correctly
 */
it("Renders The Layout Correctly With Multiple Element", () => {

    const element = render(<OneColumn colOne={[<div>One</div>, <div>Two</div>, <div>Three</div>]} />);
    expect(element).toMatchSnapshot();
})