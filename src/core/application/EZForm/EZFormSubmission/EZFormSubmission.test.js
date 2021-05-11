/*
 * File: /src/core/application/EZForm/EZFormSubmission/EZFormSubmission.test.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Test class for EZFormSubmission
 * File Created: Sunday, 2nd May 2021 1:26 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Sunday, 2nd May 2021 1:47 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import EZFormSubmission from "./EZFormSubmission";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Renders with no props", () => {
    const { baseElement } = render(<EZFormSubmission />);
    expect(baseElement).toBeTruthy();
});