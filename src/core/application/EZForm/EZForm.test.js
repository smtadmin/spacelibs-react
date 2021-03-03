/*
 * File: /src/core/application/EZForm/EZForm.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 1st March 2021 4:04 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 9:21 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

/* eslint jsdoc/require-jsdoc: 0 */

import EZForm from "./EZForm";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

jest.mock("@siliconmtn/spacelibs-js/core/io/BaseHTTPService", () => {
	return class HTTPService {
		read(url, params, onComplete){
			if(url.includes("notworking")){
				onComplete({
                    isValid: false,
                    data: {},
                });
			}else{
				onComplete({
                    isValid: true,
                    data: {
                        pages: [
                            {
                                identifier: "FDSJKL",
                                questions: [
                                    {
                                        identifier: "FDFSS",
                                        label: "Hello",
                                        dataType: {
                                            code: "text",
                                        },
                                        isRequired: true,
                                    },
                                ],
                            },
                            {
                                identifier: "FDSJKLD",
                                questions: [
                                    {
                                        identifier: "FDFSSE",
                                        label: "Hello",
                                        dataType: {
                                            code: "text",
                                        },
                                        isRequired: true,
                                    },
                                ],
                            },
                            {
                                identifier: "FDSJKLD",
                                questions: [
                                    {
                                        identifier: "FDFSSE",
                                        label: "Hello",
                                        dataType: {
                                            code: "text",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                });
			}
		}

		insert(url, data, params, onComplete){
			onComplete({
				isValid: true,
				data: {}
			});
		}
	};
});

/**
 * Checks basic form navigation, data input, validation, and submission
 */
it("Renders with valid props", () => {
    const { baseElement } = render(<EZForm formId={"working"} />);

    /** Test validation */
    let element = screen.getByText("Next");
    userEvent.click(element);

    /** Close modal */
    element = screen.getAllByText("Close")[1];
    userEvent.click(element);

    let input = screen.getByTestId("textfield-input").children[0].children[0];

    userEvent.type(input, "one");

    element = screen.getByText("Next");
    userEvent.click(element);

    element = screen.getByText("Back");
    userEvent.click(element);

    /** Get prompt */

    /** Close modal */
    element = screen.getAllByText("Close")[1];
    userEvent.click(element);

    input = screen.getByTestId("textfield-input").children[0].children[0];
	userEvent.type(input, "two");
	
	element = screen.getByText("Back");
	userEvent.click(element);

    element = screen.getByText("Next");
	userEvent.click(element);
	
	element = screen.getByText("Next");
    userEvent.click(element);

    element = screen.getByText("Submit");
    userEvent.click(element);

    expect(baseElement).toBeTruthy();
});

/**
 * Checks that form renders with invalid props
 */
it("Renders with invalid props", () => {
    const { baseElement } = render(<EZForm formId={"notworking"} />);
    expect(baseElement).toBeTruthy();
});