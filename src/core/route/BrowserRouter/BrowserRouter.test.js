/*
 * File: BrowserRouter.test
 * Version: 0.0.1
 * Project: @siliconmtn/spacelibs-react
 * Description: Testing suite for the BrowserRouter wrapping component
 * File Created: Tuesday, 16th February 2021 1:32 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th March 2021 11:32 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import BrowserRouter from './BrowserRouter';
import React from 'react';
import { render } from '@testing-library/react';

const testingRouteConfig = {
    pages: [
        {
            path: "/analytics",
            src: <div>Hello</div>,
            roles: ["admin"]
        }
    ],
    error: {
        path: "",
        src: <div>ERROR</div>
    }
};

const testingRouteConfigWithoutError = {
    pages: [
        {
            path: "/analytics",
            src: <div>Hello</div>,
            roles: ["admin"]
        }
    ]
};

const testingRouteConfigWithoutAnyRoles = {
    pages: [
        {
            path: "/analytics",
            src: <div>Hello</div>,
            roles: null
        }
    ]
};

/**
 * Attempts to render without crashing
 */
it("Renders without crashing", () => {
    const element = render(<BrowserRouter userRoles={[]} routes={testingRouteConfig} />);
    expect(element).toBeTruthy();
});

/**
 * Renders based on userRoles when the userRoles is passed as a single element
 */
it("Renders the userRole with warning if it is passed in as a single element", () => {
    const errorEvent = jest
        .spyOn(console, 'error')
        .mockImplementation(() => { });

    render(<BrowserRouter userRoles={"admin"} routes={testingRouteConfig} />);
    expect(errorEvent).toHaveBeenCalled();
});

/**
 * Renders with an error route if that route is supplied in the config
 */
it("Renders with an error route if that route is supplied in the config", () => {
    const element = render(<BrowserRouter userRoles={"admin"} routes={testingRouteConfig} />);
    expect(element.baseElement.textContent).toMatch("ERROR");
});

/**
 * Renders without an error route if that route is not supplied in the config
 */
it("Renders without an error route if that route is not supplied in the config", () => {
    const element = render(<BrowserRouter userRoles={"admin"} routes={testingRouteConfigWithoutError} />);
    expect(element.baseElement.textContent).not.toMatch("ERROR");
});

/**
 * Renders corretly when no roles are specified
 */
it("Renders corretly when no roles are specified", () => {
    const element = render(<BrowserRouter userRoles={"admin"} routes={testingRouteConfigWithoutAnyRoles} />);
    expect(element).toMatchSnapshot();
});

/**
 * Snapshot test with error route
 */
it("Renders correctly with error route", () => {
    const element = render(<BrowserRouter userRoles={"admin"} routes={testingRouteConfig} />);
    expect(element).toMatchSnapshot();
});

/**
 * Snapshot test without error route
 */
it("Renders correctly without error route", () => {
    const element = render(<BrowserRouter userRoles={"admin"} routes={testingRouteConfigWithoutError} />);
    expect(element).toMatchSnapshot();
});