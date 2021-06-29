/*
 * File: /src/core/application/EZForm/EZFormValidator/EZFormSubmission.test.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Test class for EZFormValidator
 * File Created: Sunday, 2nd May 2021 1:26 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Sunday, 2nd May 2021 10:57 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import EZFormValidator from "./EZFormValidator";
import "@testing-library/jest-dom";

it("Renders with no props", () => {
    expect(EZFormValidator).toBeTruthy();
});