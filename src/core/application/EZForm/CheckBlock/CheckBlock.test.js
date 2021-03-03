/*
 * File: /src/core/application/EZForm/CheckBlock/CheckBlock.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Class to test CheckBlock
 * File Created: Tuesday, 2nd March 2021 9:42 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 9:00 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

 /* eslint react/prop-types: 0 */

 import CheckBlock from "./CheckBlock";
 import React from "react";
 import { render } from "@testing-library/react";
 import "@testing-library/jest-dom";

jest.mock("../../../input/CheckboxGroup", () => {
    return function Checkbox(props) {
		props.onValueChanged(1);
		props.onValueChanged([]);
        return <div></div>;
    };
});

const normalProps = {
	label: "What is your birthday",
	number: 1,
	value: [],
	identifier: "1",
	onValueChanged: ()=>{},
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
         ]
     }
};

it("Renders with no props", () => {
    const { baseElement } = render(<CheckBlock {...normalProps}/>);
    expect(baseElement).toBeTruthy();
});