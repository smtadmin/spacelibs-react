/*
 * File: /src/core/api/APIContext/APIContext.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Tests for APIContext
 * File Created: Monday, 1st March 2021 8:43 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 8:50 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

 /* eslint react/prop-types: 0 */

import APIContext from "./APIContext";

/* The API Context doesn't do much, so this test is fine */
it("Exports an element", () => {
    const element = APIContext;
    expect(element).toBeTruthy();
});