/*
 * File: /src/core/application/EZForm/EZForm.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: EZForm Testing library
 * File Created: Monday, 1st March 2021 4:04 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 11th March 2021 2:24 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

/* eslint jsdoc/require-jsdoc: 0 */

import EZForm from "./EZForm";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { APIProvider } from "../../api";

const scrollTo = () => {};
Object.defineProperty(window, 'scrollTo', { value: scrollTo, writable: true });

jest.mock("@siliconmtn/spacelibs-js/core/io/BaseHTTPService", () => {
	return class HTTPService {
        read(url, params, onComplete) {
            if (url.includes("notworking")) {
                onComplete({
                    isValid: false,
                    data: {},
                });
            }else if(url.includes("normal")) {
                onComplete({
                    isValid: true,
                    data: {
						resubmitFlag: true,
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
                                        identifier: "FDFSSEED",
                                        label: "Hello",
                                        dataType: {
                                            code: "text",
                                        },
                                        isRequired: true,
                                    },
                                ],
                            },
                        ],
                    },
                });
            } else if (url.includes("async")){
				onComplete({
                    isValid: true,
                    data: {
                        identifier: "async",
                        pages: [
                            {
                                identifier: "Page1",
                                questions: [
                                    {
                                        identifier: "Date1",
                                        label: "Hello1",
                                        dataType: {
                                            code: "date",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                });
			} else if(url.includes("cover_all")) {
				onComplete({
                    isValid: true,
                    data: {
                        resubmitFlag: true,
                        identifier: "justin",
                        pages: [
                            {
                                identifier: "Page1",
                                questions: [
                                    {
                                        identifier: "Date1",
                                        label: "Hello1",
                                        dataType: {
                                            code: "date",
                                        },
                                        isRequired: true,
                                    },
                                    {
                                        identifier: "Date2",
                                        label: "Hello2",
                                        dataType: {
                                            code: "date",
                                        },
                                    },
                                    {
                                        identifier: "Select1",
                                        label: "Hello3",
                                        dataType: {
                                            code: "multiselect",
                                        },
                                        altResponseId: "3",
                                        options: [
                                            {
                                                identifier: "1",
                                                displayText: "one",
                                            },
                                            {
                                                identifier: "2",
                                                displayText: "two",
                                            },
                                            {
                                                identifier: "3",
                                                displayText: "three",
                                            },
                                        ],
                                    },
                                    {
                                        identifier: "Select2",
                                        label: "Hello4",
                                        dataType: {
                                            code: "multiselect",
                                        },
                                        isRequired: true,
                                        options: [
                                            {
                                                identifier: "1",
                                                displayText: "one",
                                            },
                                            {
                                                identifier: "2",
                                                displayText: "two",
                                            },
                                            {
                                                identifier: "3",
                                                displayText: "three",
                                            },
                                        ],
                                    },
                                    {
                                        identifier: "Check1",
                                        label: "Hello5",
                                        dataType: {
                                            code: "check",
										},
                                        options: [
                                            {
                                                identifier: "1",
												displayText: "one",
                                            },
                                            {
                                                identifier: "2",
                                                displayText: "two",
                                            },
                                            {
                                                identifier: "3",
                                                displayText: "three",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                });
			}
        }

        insert(url, data, params, onComplete) {
			if (url.includes("justin")) {
				onComplete({
					isValid: true,
					data: {}, 
				});
			} else if (url.includes("async")) {
				setTimeout(function () {
					onComplete({
						isValid: true
					});
				}, 300);	
			} else {
				onComplete({
					isValid: false,
				});
			}
        }

        update(url, data, params, onComplete) {
            onComplete({
                isValid: true,
                data: {},
            });
        }

        delete(url, data, params, onComplete) {
            onComplete({
                isValid: true,
                data: {},
            });
        }

        getBaseURL() {
            return "";
        }
    };
});

/**
 * Checks basic form navigation, data input, validation, and submission
 */
it("Renders with valid props", () => {
    const { baseElement } = render(<EZForm formId={"normal"} />);

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
	
	element = screen.getAllByText("Close")[1];
	userEvent.click(element);

	input = screen.getByTestId("textfield-input").children[0].children[0];
	userEvent.type(input, "three");
	
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

it("Renders with a context", () => {
    const { baseElement } = render(
        <APIProvider>
            <EZForm formId={"notworking"} />
        </APIProvider>
    );
    expect(baseElement).toBeTruthy();
});

/** This gets coverage on all the input types and validation. 
 * It will be replaced when we move validation to each input  */
it("Renders all data types", () => {
	const { baseElement } = render(<EZForm formId={"cover_all"} />);

	let element = screen.getByText("Submit");
    userEvent.click(element);

    element = screen.getAllByText("Close")[1];
	userEvent.click(element);

	let input = screen.getAllByTestId("date-input")[0].children[0].children[0];
	userEvent.type(input, "33/33/3333");

	input = screen.getAllByTestId("date-input")[1].children[0].children[0];
	userEvent.type(input, "33/33/3333");

	/** Select picker selection */
	const inputParent = screen.getAllByTestId("select")[0];
    input = inputParent.children[0].children[0].children[0];
    userEvent.click(input);
    userEvent.type(input, "one");
    let popper = screen.getAllByTestId("select-option");
    let option = popper[0].parentElement.parentElement;
	userEvent.click(option);
	
	userEvent.click(input);
	userEvent.clear(input);
    userEvent.type(input, "three");
    popper = screen.getAllByTestId("select-option");
    option = popper[0].parentElement.parentElement;
	userEvent.click(option);

	element = screen.getByText("Submit");
    userEvent.click(element);

    element = screen.getAllByText("Close")[1];
    userEvent.click(element);
	
	input = screen.getByTestId("textfield-input").children[1].children[0];
    userEvent.click(input);
    userEvent.type(input, "Hi");

	element = screen.getByText("Submit");
    userEvent.click(element);
	
	element = screen.getAllByText("Close")[1];
	userEvent.click(element);
	
	input = screen.getAllByTestId("date-input")[0].children[0].children[0];
	userEvent.clear(input);
    userEvent.type(input, "12/12/2015");

	input = screen.getAllByTestId("date-input")[1].children[0].children[0];
	userEvent.clear(input);
	userEvent.type(input, "12/12/2015");

	const inputParent2 = screen.getAllByTestId("select")[1];
    input = inputParent2.children[0].children[0].children[0];
    userEvent.click(input);
    userEvent.type(input, "one");
    let popper2 = screen.getAllByTestId("select-option");
    let option2 = popper2[0].parentElement.parentElement;
	userEvent.click(option2);

	const element3 = screen.getAllByTestId("checkbox")[0];
    const input3 = element3.children[0].children[0];
    userEvent.click(input3);
	
	element = screen.getByText("Submit");
    userEvent.click(element);
    
	element = screen.getByTestId("button");
	userEvent.click(element);

	expect(baseElement).toBeTruthy();
});

it("Covers async waiting of API", () => {
	const { baseElement } = render(<EZForm formId={"async"} />);

	let element = screen.getByText("Submit");
    userEvent.click(element);

	expect(baseElement).toBeTruthy();
});