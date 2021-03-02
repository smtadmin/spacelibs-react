/*
 * File: /src/core/application/EZForm/RadioBlock/RadioBlock.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 2nd March 2021 12:42 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd March 2021 12:44 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
*/
import RadioBlock from "./RadioBlock";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../../../input/RadioGroup", () => {
    return function RadioGroup(props) {
        props.onValueChanged(1);
        props.onValueChanged([]);
        return <div></div>;
    };
});

const props = {
    label: "What is your birthday",
    number: 1,
    value: [],
    identifier: "1",
    onValueChanged: () => {},
    config: {
        options: [
            {
                identifier: "A",
                displayText: "Option A",
                isSelected: undefined,
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

it("Renders with no props", () => {
    const { baseElement } = render(<RadioBlock {...props} />);
    expect(baseElement).toBeTruthy();
});