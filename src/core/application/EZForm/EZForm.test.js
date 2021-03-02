/*
 * File: /src/core/application/EZForm/EZForm.test.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 1st March 2021 4:04 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 2nd March 2021 1:47 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import EZForm from "./EZForm";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

jest.mock("@siliconmtn/spacelibs-js/core/io/BaseHTTPService", () => {
	return class HTTPService {
		read(url, params, onComplete){
			if(url.includes("notworking")){
				console.log("return not working");
				onComplete({
                    isValid: false,
                    data: {},
                });
			}else{
				console.log("return working");
				onComplete({
					isValid: true,
					data: {
						pages: [{
							identifier: "FDSJKL",
							questions: [{
								identifier: "FDFSS",
								label: "Hello",
								dataType: {
									code: "text"
								}
							}]
						}]
					}
				});
			}
		}

		insert(url, data, params, onComplete){
			if(data == {}){
				onComplete({
                    isValid: false,
                    data: {},
                });
			}else{
				onComplete({
					isValid: true,
					data: {}
				});
			}
		}
	};
});

it("Renders with valid props", () => {
	const { baseElement } = render(<EZForm formId={"working"} />);

	/** Test validation */
	const element = screen.getByText("Submit");
    userEvent.click(element);

	expect(baseElement).toBeTruthy();
});

it("Renders with invalid props", () => {
    const { baseElement } = render(<EZForm formId={"notworking"} />);
    expect(baseElement).toBeTruthy();
});