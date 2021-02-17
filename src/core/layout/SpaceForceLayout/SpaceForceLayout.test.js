/*
 * File: SpaceForceLayout.test
 * Version: 0.1.0
 * Project: react-test
 * Description: Testing suite for the SpaceForceLayout
 * File Created: Saturday, 6th February 2021 11:01 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 17th February 2021 12:13 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import SpaceForceLayout from './SpaceForceLayout';
import React from 'react';
import { render } from '@testing-library/react';

const ThemeConfig = {
    header: {
        left: {
            mobile: null,
            desktop: "logo"
        },
        center: {
            mobile: null,
            desktop: "main menu"
        },
        right: {
            mobile: null,
            desktop: "setting menu"
        }
    },
    footer: {
        left: {
            mobile: null,
            desktop: null
        },
        center: {
            mobile: "menu",
            desktop: null
        },
        right: {
            mobile: null,
            desktop: null
        },

    }
}

/**
 * Attempts to render a SpaceForceLayout component to confirm that it renders without crashing
 */
it("Renders without crashing", () => {

    const element = render(<SpaceForceLayout ThemeConfig={ThemeConfig} />);
    expect(element).toBeTruthy();

});

/**
 * Renders a SpaceForceLayout component and compares the render output to a snapshot to confirm that the output is consistent
 */
it("Renders Correctly", () => {

    const element = render(<SpaceForceLayout ThemeConfig={ThemeConfig} />);
    expect(element).toMatchSnapshot();
})
