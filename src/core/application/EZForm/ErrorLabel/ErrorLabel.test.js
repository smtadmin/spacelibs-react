/*
 * File: /src/core/application/EZForm/ErrorLabel/ErrorLabel.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 2nd March 2021 11:41 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd March 2021 11:42 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import ErrorLabel from "./ErrorLabel";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

/**
 * Checks that the button renders and the current snapshot matches the previous one.
 */
it("Renders with no props", () => {
    const { baseElement } = render(<ErrorLabel />);
    expect(baseElement).toBeTruthy();
});

it("Renders with message props", () => {
    const { baseElement } = render(<ErrorLabel errorMessage={"Hi"}/>);
    expect(baseElement).toBeTruthy();
});