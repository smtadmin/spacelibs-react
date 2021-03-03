/*
 * File: /src/core/application/EZForm/QuestionBlock/QuestionBlock.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Class to test QuestionBlock
 * File Created: Tuesday, 2nd March 2021 12:57 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 9:05 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

 import QuestionBlock from "./QuestionBlock";
 import React from "react";
 import { render } from "@testing-library/react";
 import "@testing-library/jest-dom";

/**
 * Checks that the question block renders
 */
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