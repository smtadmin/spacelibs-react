/*
 * File: /src/core/application/EZForm/SelectBlock/SelectBlock.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Tests SelectBlock class
 * File Created: Tuesday, 2nd March 2021 11:15 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 9:19 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

 /* eslint react/prop-types: 0 */
 /* eslint jsdoc/require-jsdoc: 0 */

import SelectBlock from "./SelectBlock";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

const startingProps = {
    label: "What is your birthday",
    number: 1,
    value: [
        {
            identifier: "A",
            displayText: "Hello",
        },
    ],
    identifier: "1",
    onValueChanged: () => {},
    errorMessage: "",
    isValid: true,
    altResponseId: "B",
    config: {
        options: [
            {
                identifier: "A",
                displayText: "Hello",
            },
            {
                identifier: "B",
                displayText: "Other",
            },
        ],
    },
};

const multipleProps = {
    label: "What is your birthday",
    number: 1,
    value: [
        {
            identifier: "A",
            displayText: "Hello",
        },
        {
            identifier: "B",
            displayText: "Other",
        }
    ],
    identifier: "1",
    onValueChanged: () => {},
    errorMessage: "",
    isValid: true,
    altResponseId: "B",
    dataType: {
        isMultiple: true,
    },
    config: {
        options: [
            {
                identifier: "A",
                displayText: "Hello",
            },
            {
                identifier: "B",
                displayText: "Other",
            },
        ],
    },
};

jest.mock("../../../input/SelectField", () => {

	const react = require("react");

	return class SelectField extends react.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.props.onValueChanged([]);
            this.props.onValueChanged({ identifier: "B" });
            this.props.onValueChanged({ identifier: "A" });
        }

        render() {
            return <span>Hi</span>;
        }
    };
});

jest.mock("../../../input/TextField", () => {
    const react = require("react");

    return class TextField extends react.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.props.onValueChanged({target: { value: "Hi"}});
        }

        render() {
            return <span>Hi</span>;
        }
    };
});

/**
 * Checks that SelectBlock renders with normal props
 */
it("Renders with props", () => {
    const { baseElement } = render(<SelectBlock {...startingProps} />);
    expect(baseElement).toBeTruthy();
});

/**
 * Checks that SelectBlock renders with isMultiple set
 */
it("Renders with isMultiple props", () => {
    const { baseElement } = render(<SelectBlock {...multipleProps} />);
    expect(baseElement).toBeTruthy();
});