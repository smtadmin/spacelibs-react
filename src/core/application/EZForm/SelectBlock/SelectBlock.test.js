/*
 * File: /src/core/application/EZForm/SelectBlock/SelectBlock.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 2nd March 2021 11:15 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd March 2021 12:42 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

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

	const React = require("react");

	return class SelectField extends React.Component{
		constructor(props){
			super(props);
		}

		componentDidMount(){
			this.props.onValueChanged([]);
			this.props.onValueChanged({identifier: "B"});
			this.props.onValueChanged({identifier: "A"});
		}

		render(){
			return <span>Hi</span>;
		}
	};
});

jest.mock("../../../input/TextField", () => {
    const React = require("react");

    return class TextField extends React.Component {
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

it("Renders with props", () => {
    const { baseElement } = render(<SelectBlock {...startingProps} />);
    expect(baseElement).toBeTruthy();
});

it("Renders with isMultipleprops", () => {
    const { baseElement } = render(<SelectBlock {...multipleProps} />);
    expect(baseElement).toBeTruthy();
});