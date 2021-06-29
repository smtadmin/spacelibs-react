/*
 * File: /src/core/application/EZForm/EZForm.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: EZForm Testing library
 * File Created: Monday, 1st March 2021 4:04 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 28th May 2021 11:11 am
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
import { APIProvider } from "../../api";

const scrollTo = () => {};
Object.defineProperty(window, 'scrollTo', { value: scrollTo, writable: true });

jest.mock("@siliconmtn/spacelibs-js/core/io/BaseHTTPService", () => {
	function getSelectData(url) {
		url = url.replace("/api/form/", "");
        let value = questionMap[url];
        if (!value) {
            throw Error("Questiond data not found for " + url);
        }

        return {
            isValid: true,
            data: {
                resubmitFlag: true,
                pages: [
                    {
                        identifier: "P1",
                        questions: value,
                    },
                ],
            },
        };
    }

    const questionMap = {
        t_single_other: [
            {
                identifier: "Q1",
                label: "Pick other",
                type: "CHOICE",
                dataType: {
                    code: "TEXT",
                },
                required: true,
                altResponseId: "1",
                options: [
                    {
                        identifier: "1",
                        displayText: "Other",
                    },
                    {
                        identifier: "2",
                        displayText: "Hi",
                    },
                    {
                        identifier: "3",
                        displayText: "Bonjour",
                    },
                    {
                        identifier: "4",
                        displayText: "Hola",
                    },
                    {
                        identifier: "5",
                        displayText: "Hello",
                    },
                ],
            },
        ],
        t_number_no_required: [
            {
                identifier: "Q1",
                label: "Enter a number",
                type: "ENTRY",
                dataType: {
                    code: "NUMBER",
                },
                required: false,
            },
        ],
        t_number_required: [
            {
                identifier: "Q1",
                label: "Enter a number",
                type: "ENTRY",
                dataType: {
                    code: "NUMBER",
                },
                required: true,
            },
        ],
        t_multi_required: [
            {
                identifier: "Q1",
                label: "Pick a greeting",
                type: "MULTI",
                dataType: {
                    code: "TEXT",
                },
                altResponseId: "5",
                options: [
                    {
                        identifier: "1",
                        displayText: "Hello",
                    },
                    {
                        identifier: "2",
                        displayText: "Hi",
                    },
                    {
                        identifier: "3",
                        displayText: "Bonjour",
                    },
                    {
                        identifier: "4",
                        displayText: "Hola",
                    },
                    {
                        identifier: "5",
                        displayText: "Other",
                    },
                ],
                required: true,
            },
        ],
        t_choice_required: [
            {
                identifier: "Q1",
                label: "Pick a greeting",
                type: "CHOICE",
                dataType: {
                    code: "TEXT",
                },
                options: [
                    {
                        identifier: "1",
                        displayText: "Hello",
                    },
                    {
                        identifier: "2",
                        displayText: "Hi",
                    },
                    {
                        identifier: "3",
                        displayText: "Bonjour",
                    },
                ],
                required: true,
            },
        ],
        t_choice_optional: [
            {
                identifier: "Q1",
                label: "Pick a greeting",
                type: "CHOICE",
                dataType: {
                    code: "TEXT",
                },
                options: [
                    {
                        identifier: "1",
                        displayText: "Hello",
                    },
                    {
                        identifier: "2",
                        displayText: "Hi",
                    },
                    {
                        identifier: "3",
                        displayText: "Bonjour",
                    },
                ],
                required: false,
            },
        ],
    };


	return class HTTPService {
        read(url, params, onComplete) {
            if (url.includes("notworking")) {
                onComplete({
                    isValid: false,
                    data: {},
				});
			} else if(url.includes("normal")) {
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
                                        type: "ENTRY",
                                        dataType: {
                                            code: "TEXT",
                                        },
                                        required: true,
                                    },
                                ],
                            },
                            {
                                identifier: "FDSJKLD",
                                questions: [
                                    {
                                        identifier: "FDFSSE",
                                        label: "Hello",
                                        type: "ENTRY",
                                        dataType: {
                                            code: "TEXT",
                                        },
                                        required: true,
                                    },
                                ],
                            },
                            {
                                identifier: "FDSJKLD",
                                questions: [
                                    {
                                        identifier: "FDFSSEED",
                                        label: "Hello",
                                        type: "ENTRY",
                                        dataType: {
                                            code: "TEXT",
                                        },
                                        required: true,
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
                                        type: "ENTRY",
                                        dataType: {
                                            code: "DATE",
										},
										required: false
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
                                        type: "ENTRY",
                                        dataType: {
                                            code: "DATE",
                                        },
                                        required: true,
                                    },
                                    {
                                        identifier: "Date2",
                                        type: "ENTRY",
                                        label: "Hello2",
                                        dataType: {
                                            code: "DATE",
                                        },
                                        required: false,
                                    },
                                    {
                                        identifier: "Select1",
                                        label: "Hello3",
                                        type: "MULTI",
                                        dataType: {
                                            code: "TEXT",
                                        },
                                        altResponseId: "3",
                                        required: false,
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
                                            {
                                                identifier: "4",
                                                displayText: "four",
                                            },
                                            {
                                                identifier: "5",
                                                displayText: "five",
                                            },
                                        ],
                                    },
                                    {
                                        identifier: "Select2",
                                        label: "Hello4",
                                        type: "MULTI",
                                        dataType: {
                                            code: "TEXT",
                                        },
                                        required: true,
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
                                            {
                                                identifier: "4",
                                                displayText: "four",
                                            },
                                            {
                                                identifier: "5",
                                                displayText: "five",
                                            }
                                        ],
                                    },
                                    {
                                        identifier: "Check1",
                                        label: "Hello5",
                                        type: "MULTI",
                                        dataType: {
                                            code: "TEXT",
                                        },
                                        required: false,
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
			} else {
				onComplete(getSelectData(url));
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

/**
 * Test a required number question
 */
it("Renders a required number question", () => {
	render(<EZForm formId={"t_number_required"} />);

	/** Attempt to submit with no data */
	const submit1 = screen.getByText("Submit");
	userEvent.click(submit1);
	
	/** Close validation failed dialog */
	const close1 = screen.getAllByText("Close")[1];
	userEvent.click(close1);

	/** Enter a non-number string */
	const field1 = screen.getByTestId("textfield-input").children[0].children[0];
    userEvent.click(field1);
	userEvent.type(field1, "hi");
	
	/** Attempt to submit with invalid data */
	userEvent.click(submit1);

	/** Close validation failed dialog */
	const close2 = screen.getAllByText("Close")[1];
	userEvent.click(close2);

	/** Enter a valid number */
	userEvent.click(field1);
	userEvent.clear(field1);
	userEvent.type(field1, "1");
	
	/** Attempt to submit with invalid data */
	userEvent.click(submit1);
	
	expect(field1.value).toBe("1");
});

/**
 * Test a non-required number question
 */
it("Renders a non-required number question", () => {
    render(<EZForm formId={"t_number_no_required"} />);

    /** Enter a non-number string */
    const field1 = screen.getByTestId("textfield-input").children[0].children[0];
    userEvent.click(field1);
    userEvent.type(field1, "hi");

    /** Attempt to submit with invalid data */
    const submit1 = screen.getByText("Submit");
    userEvent.click(submit1);

    /** Close validation failed dialog */
    const close2 = screen.getAllByText("Close")[1];
    userEvent.click(close2);

    /** Clear invalid data */
    userEvent.clear(field1);

    /** Submit with nothing entered */
    userEvent.click(submit1);

    expect(field1.value).toBe("");
});

/**
 * Test a required MULTI question other option
 */
it("Renders a required MULTI question", () => {
    const { baseElement } = render(<EZForm formId={"t_multi_required"} />);

    expect(baseElement).toBeTruthy();

    /** Click the dropdown */
    const input1 = screen.getAllByTestId("select")[0];
    const inputChild1 = input1.children[0].children[0].children[0];
    userEvent.click(inputChild1);

    /** Type Other */
    userEvent.type(inputChild1, "Other");

	/** Select the other option */
    const popper1 = screen.getAllByTestId("select-option");
    const popper1option = popper1[0].parentElement.parentElement;
    userEvent.click(popper1option);

    /** Attempt to submit with invalid data */
    const submit1 = screen.getByText("Submit");
    userEvent.click(submit1);

    /** Close validation failed dialog */
    const close2 = screen.getAllByText("Close")[1];
    userEvent.click(close2);
});

/**
 * Test a required CHOICE question 
 */
it("Renders a required CHOICE question", () => {
    const { baseElement } = render(<EZForm formId={"t_choice_required"} />);
    expect(baseElement).toBeTruthy();

    /** Attempt to submit without picking an option */
    const submit1 = screen.getByText("Submit");
    userEvent.click(submit1);

    /** Close validation failed dialog */
    const close1 = screen.getAllByText("Close")[1];
    userEvent.click(close1);

    /** Click element on radio */
    const element = screen.getAllByTestId("radio-group")[0];
    const input = element.children[0].children[0];
    userEvent.click(input);

    /** Attempt to submit with valid data */
    userEvent.click(submit1);
});

/**
 * Test an optional CHOICE question 
 */
it("Renders an optional CHOICE question", () => {
    const { baseElement } = render(<EZForm formId={"t_choice_optional"} />);
    expect(baseElement).toBeTruthy();

    /** Attempt to submit without picking an option */
    const submit1 = screen.getByText("Submit");
    userEvent.click(submit1);
});
