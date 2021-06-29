/*
 * File: /src/core/application/EZForm/QuestionLabel/QuestionLabel.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Class that tests question label
 * File Created: Monday, 1st March 2021 8:50 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 28th May 2021 11:56 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import QuestionLabel from "./QuestionLabel";
import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";

/**
 * Checks that the question label renders and the current snapshot matches the previous one.
 */
it("Renders with no props", ()=> {
	const { baseElement, getByText } = render(<QuestionLabel number={1} label={"What is your name?"} required={false}/>);
	expect(baseElement).toBeTruthy();
	expect(baseElement).toMatchSnapshot();
	expect(getByText("1. What is your name?")).toBeInTheDocument();
});

/**
 * Checks that question label renders with normal props
 */
it("Renders with required prop", () => {
    const { baseElement, getByText } = render(
        <QuestionLabel
            number={1}
            label={"What is your name?"}
            required={true}
        />
    );
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
    expect(getByText("*")).toBeInTheDocument();
});