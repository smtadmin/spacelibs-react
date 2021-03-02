/*
 * File: /src/core/application/EZForm/QuestionBlock/QuestionBlock.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 2nd March 2021 12:57 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd March 2021 1:03 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

 import QuestionBlock from "./QuestionBlock";
 import React from "react";
 import { render } from "@testing-library/react";
 import "@testing-library/jest-dom";


it("Renders with with questions", () => {
	const props = {
			identifier: "FJIDSLKSDJS",
			dataType: {
				code: "text",
			},
			label: "Question label",
			number: 1,
			onValueChanged: ()=>{}
	};
	const { baseElement, rerender } = render(<QuestionBlock {...props} />);
	rerender(<QuestionBlock {...props} />);
    expect(baseElement).toBeTruthy();
});