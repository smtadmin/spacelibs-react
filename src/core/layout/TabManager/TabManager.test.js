/*
 * File: /src/core/layout/TabManager/TabManager.test.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Test class for Tab Manager
 * File Created: Sunday, 2nd May 2021 1:27 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Sunday, 2nd May 2021 2:48 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import TabManager from "./TabManager";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Renders with no props", () => {
    const { baseElement } = render(<TabManager />);
    expect(baseElement).toBeTruthy();
});

it("Renders with normal props", () => {
	let items = [
		{
            title: "Tab",
            component: <div></div>,
            isDisabled: false,
		},
		{
			title: "Tab 2",
			component: <div></div>,
			isDisabled: false
		}
	];
    let extraButtons = [{
            tabComponent: <div></div>,
            callback: () => {},
    }];

    const { baseElement } = render(
        <TabManager
            items={items}
            extraButtons={extraButtons}
            defaultIndex={0}
        />
    );
    expect(baseElement).toBeTruthy();
});