/*
 * File: RadioGroup.test
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Testing Suite for the Radio Group input field
 * File Created: Thursday, 11th February 2021 11:51 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 11th February 2021 1:50 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import {
    render,
    screen
} from "@testing-library/react";
import RadioGroup from "./RadioGroup";
import userEvent from '@testing-library/user-event';

const singleOptionNoValues = {
    alignment: "horizontal",
    number: 1,
    identifier: "1",
    type: "date",
    label: "Date Action Completed",
    isRequired: true,
    value: [],
    onValueChanged: () => { },
    config: {
        options: [
            {
                identifier: "A",
                displayText: "Option A",
                isSelected: undefined,
                isDisabled: undefined,
            }
        ],
    },
};

const twoOptionsOneSelectedValue = {
    number: 1,
    identifier: "1",
    type: "date",
    label: "Date Action Completed",
    isRequired: true,
    value: [
        {
            identifier: "B",
            displayText: "Option B",
            isDisabled: false,
        },
    ],
    onValueChanged: () => { },
    subText: "Error occurred",
    config: {
        options: [
            {
                identifier: "A",
                displayText: "Option A",
                isSelected: true,
                isDisabled: undefined,
            },
            {
                identifier: "B",
                displayText: "Option B",
                isDisabled: false,
            },
        ],
    },
};

/**
 * RadioGroup smoke test
 */
it("Renders without crashing", () => {
    const element = render(<RadioGroup {...singleOptionNoValues} />);
	expect(element).toBeTruthy();
});

/**
 * It renders a single values in the RadioGroup correctly
 */
it("Renders with single value", () => {
    render(<RadioGroup {...singleOptionNoValues} />);
    const element = screen.getAllByTestId('radio-group')[0].children[0].children[0].children[0].children[0];
    expect(element.value).toBe("A");
});

/**
 * It renders multiple values in the Radio Group correctly
 */
it("Renders with multiple values", () => {
    render(<RadioGroup {...twoOptionsOneSelectedValue} />);
    const inputElement1 = screen.getAllByTestId('radio-group')[0].children[0].children[0].children[0];
    const inputElement2 = screen.getAllByTestId('radio-group')[0].children[1].children[0].children[0];
    expect(inputElement1.children[0].value).toBe("A");
    expect(inputElement2.children[0].value).toBe("B");
});

/**
 * It renders out a radio group with the label in the correct place when the labelPlacement prop is set to left
 */
it("Renders correctly when labelPlacement is set to left", () => {
    render(<RadioGroup {...singleOptionNoValues} labelPlacement="left" />);
    const element = screen.getAllByTestId('radio-group')[0].children[0];
    expect(element.className).toContain("MuiFormControlLabel-labelPlacementStart");
});

/**
 * It renders out a radiogroup with the label in the correct place when the labelPlacement prop is set to top
 */
it("Renders correctly when labelPlacement is set to the top position", () => {
    render(<RadioGroup {...singleOptionNoValues} labelPlacement="top" />);
    const element = screen.getAllByTestId('radio-group')[0].children[0];
    expect(element.className).toContain("MuiFormControlLabel-labelPlacementTop");
});

/**
 * It correctly fires the callback when a user input is detected
 */
it("updates the correct field when a checkbox is selected", () => {
    const mockedFunction = jest.fn();    render(<RadioGroup {...singleOptionNoValues} onValueChanged={mockedFunction} />);
    const element = screen.getAllByTestId('radio-group')[0];
    const input = element.children[0].children[0];
    userEvent.click(input);
    expect(mockedFunction).toHaveBeenCalled();
});

/**
 * It correctly fires the callback when a user input is detected
 */
it("updates the correct field when a multiple radios are checked", () => {
    const mockedFunction = jest.fn();    render(<RadioGroup {...twoOptionsOneSelectedValue} onValueChanged={mockedFunction} />);
    const element = screen.getAllByTestId('radio-group')[0];
    const input = element.children[0].children[0];
    userEvent.click(input);
    expect(mockedFunction).toHaveBeenCalled();
});