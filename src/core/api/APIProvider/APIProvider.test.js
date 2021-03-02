/*
 * File: /src/core/api/APIProvider/APIProvider.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 1st March 2021 8:47 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 1st March 2021 4:02 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import APIProvider from "./APIProvider";
import APIContext from '../APIContext';
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

/**
 * Checks that the button renders and the current snapshot matches the previous one.
 */
it("Renders with no props", () => {
    const { baseElement } = render(
        <APIProvider />
    );
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
});

it("Renders with props", () => {
    const { baseElement } = render(<APIProvider baseURL={"http://www.siliconmtn.com"} />);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
});

it("Passes valid api information", () => {

	const base = "http://www.siliconmtn.com";
	/**
	 * Component to test 
	 *
	 * @param {*} props - Component props
	 * @returns {*} empty element
	 */
	function Comp(props){
		expect(props.read).toBeDefined();
		expect(props.update).toBeDefined();
		expect(props.insert).toBeDefined();
		expect(props.delete).toBeDefined();
		expect(props.baseURL).toEqual(base);
		props.read("/home.html",null, ()=>{}, {});
		props.update("/home.html",null, null, () => {}, {});
		props.insert("/home.html",null, null, () => {}, {});
		props.delete("/home.html",null, null, () => {}, {});
		return <div></div>;
	}

	const { baseElement } = render(<APIProvider baseURL={base}>
		<APIContext.Consumer >
			{(value) => 
				<Comp {...value}/>
			}
		</APIContext.Consumer>
	</APIProvider>);

	expect(baseElement).toBeTruthy();
});