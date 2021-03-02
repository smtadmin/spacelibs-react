/*
 * File: /src/core/application/EZForm/TextBlock/TextBlock.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 2nd March 2021 11:05 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd March 2021 11:14 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */


import TextBlock from "./TextBlock";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../../../input/TextField", () => {
    return function Mock(props) {
        props.onValueChanged(Date());
        props.onValueChanged([]);
        return <div></div>;
    };
});

const startingProps = {
    label: "What is your birthday",
    number: 1,
    value: [],
    identifier: "1",
	onValueChanged: () => {},
};

const noValueProps = {
    label: "What is your birthday",
    number: 1,
    identifier: "1",
    onValueChanged: () => {},
};

it("Renders with props", () => {
    const { baseElement } = render(<TextBlock {...startingProps} />);
    expect(baseElement).toBeTruthy();
});

it("Renders with no value props", () => {
    const { baseElement } = render(<TextBlock {...noValueProps} />);
    expect(baseElement).toBeTruthy();
});
