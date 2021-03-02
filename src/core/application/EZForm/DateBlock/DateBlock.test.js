/*
 * File: /src/core/application/EZForm/DateBlock/DateBlock.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 2nd March 2021 10:56 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd March 2021 11:04 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

 import DateBlock from "./DateBlock";
 import React from "react";
 import { render } from "@testing-library/react";
 import "@testing-library/jest-dom";

jest.mock("../../../input/DateField", () => {

    return function DateMock(props) {
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
	onValueChanged: ()=>{}
};

it("Renders with no props", () => {
     const { baseElement } = render(<DateBlock {...startingProps} />);
     expect(baseElement).toBeTruthy();
});