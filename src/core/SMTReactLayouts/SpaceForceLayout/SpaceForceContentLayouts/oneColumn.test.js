/*
 * File: oneColumn.test
 * Version: 0.1.0
 * Project: react-test
 * Description: Testing suite for the SpaceForceContentLayout OneColumn Layout
 * File Created: Monday, 8th February 2021 12:30 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 9th February 2021 1:35 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import OneColumn from './OneColumn';
import React from 'react';
import { render } from '@testing-library/react';

it("Renders without crashing", () => {

    const element = render(<OneColumn  />);
    expect(element).toBeTruthy();

});

it("Renders The Layout Correctly With One Element", () => {

    const element = render(<OneColumn colOne={<div>Hello World</div>} />);
    expect(element).toMatchSnapshot();
})

it("Renders The Layout Correctly With Multiple Element", () => {

    const element = render(<OneColumn colOne={[<div>One</div>, <div>Two</div>, <div>Three</div>]} />);
    expect(element).toMatchSnapshot();
})