/*
 * File: /src/core/application/EZForm/EZFormBase/EZFormBase.test.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Testing class for EZFormBase
 * File Created: Sunday, 2nd May 2021 1:25 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Sunday, 2nd May 2021 2:24 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import EZFormBase from "./EZFormBase";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Renders with no props", () => {
	const formData = {
		pages: []
	};

	const { baseElement } = render(<EZFormBase unformattedFormData={formData} />);
	expect(baseElement).toBeTruthy();
});