/*
 * File: MenuFactory.test
 * Version: 0.1.0
 * Project: react-test
 * Description: Testing suite for the MenuFactory Component
 * File Created: Monday, 8th February 2021 12:19 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th March 2021 11:41 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import MenuFactory from './MenuFactory';
import React from 'react';
import { render } from '@testing-library/react';


const demoRoutes = {
    publicRouteData: [
        {
            text: "Analytics",
            icon: "Analytics Icon",
            link: "/analytics",
            children: []
        }
    ],
    adminRouteData: [
        {
            text: "Admin Page",
            icon: "admin Page Icon",
            link: "/admin",
            children: []
        }
    ]
};

/**
 * Attempts to render a MenuFactory component to confirm that it renders without crashing
 */
it("Renders without crashing", () => {

    const element = render(<MenuFactory name="mobile-public-menu" routeData={demoRoutes.publicRouteData} />);
    expect(element).toBeTruthy();

});

/**
 * Renders a MenuFactory component using the publicRouteData object and compares the render output to a snapshot
 */
it("Renders Public Menus Correctly", () => {

    const element = render(<MenuFactory name="mobile-public-menu" routeData={demoRoutes.publicRouteData} />);
    expect(element).toMatchSnapshot();
});

/**
 * Renders a MenuFactory component using the adminRouteData object  and compares the render output to a snapshot
 */
it("Renders Admin Menus Correctly", () => {

    const element = render(<MenuFactory name="mobile-public-menu" routeData={demoRoutes.adminRouteData} />);
    expect(element).toMatchSnapshot();
});

/**
 * Renders a MenuFactory component using the publicRouteData object with the icon prop set to false and compares the render output to a snapshot
 */
it("Renders Public Menus Correctly Without Icons", () => {

    const element = render(<MenuFactory name="mobile-public-menu" icon={false} routeData={demoRoutes.publicRouteData} />);
    expect(element).toMatchSnapshot();
});

/**
 * Renders a MenuFactory component using the publicRouteData object with the dropdown prop set to true and compares the render output to a snapshot
 */
it("Renders A Dropdown Menu Correctly", () => {

    const element = render(<MenuFactory name="dropdown-test" routeData={demoRoutes.publicRouteData} dropdown={true} />);
    expect(element).toMatchSnapshot();
});

/**
 * Renders a MenuFactory component using the publicRouteData object with the text prop set to false and compares the render output to a snapshot
 */
it("Renders Public Menus Correctly Without Text", () => {

    const element = render(<MenuFactory name="mobile-public-menu" text={false} routeData={demoRoutes.publicRouteData} />);
    expect(element).toMatchSnapshot();
    
});