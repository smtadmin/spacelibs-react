/*
 * File: /src/core/application/EZForm/EZFormPage/EZFormPage.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 1st March 2021 4:02 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd March 2021 1:11 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

 import EZFormPage from "./EZFormPage";
 import React from "react";
 import { render } from "@testing-library/react";
 import "@testing-library/jest-dom";
import { isExportDeclaration } from "typescript";
import { any } from "prop-types";

it("Renders with no props", () => {
	const {baseElement} = render(<EZFormPage/>);
	expect(baseElement).toBeTruthy();
});

it("Renders with with valid questions", () => {
    const props = {
        onValueChanged: () => {},
        questions: [
            {
                identifier: "FJIDSLKSDJS",
                dataType: {
                    code: "text",
                },
                label: "Question label",
                number: 1,
            },
            {
                identifier: "FJIDSLKSDJG",
                dataType: {
                    code: "text",
                },
                label: "Question label",
                number: 2,
            },
        ],
    };
    const { baseElement }= render(<EZFormPage {...props} />);
    expect(baseElement).toBeTruthy();
});

it("Renders with with invalid questions", () => {
	const props = {
        onValueChanged: () => {},
        questions: [
            {
                identifier: "FJIDSLKSDJS",
                dataType: {
                    code: "text",
                },
                label: "Question label",
                number: 1,
            },
            {
                identifier: "FJIDSLKSDJG",
                dataType: {
                    code: "blah blah",
                },
                label: "Question label",
                number: 2,
            },
        ],
	};

	expect(render(<EZFormPage {...props} />)).toBeTruthy();
});