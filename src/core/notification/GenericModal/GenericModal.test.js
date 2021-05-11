/*
 * File: GenericModal.test.js
 * Version: 0.0.1
 * Project: spacelibs-react
 * Description: Class to test the generic modal
 * File Created: Tuesday, 11th May 2021 2:54 pm
 * Author: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 11th May 2021 3:31 pm
 * Modified By: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import GenericModal from "./GenericModal";

describe("GenericModal", () => {

    const props = {
        show: true,
        title: 'modal'
    };

    const infoIcon = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z";
    const helpIcon = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.69-1.33-1.39-1.53-1.11-.31-2.14.32-2.47 1.27-.12.37-.43.65-.82.65h-.3C8.4 9 8 8.44 8.16 7.88c.43-1.47 1.68-2.59 3.23-2.83 1.52-.24 2.97.55 3.87 1.8 1.18 1.63.83 3.38-.19 4.4z";
    const warningIcon = "M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z";
    const errorIcon = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z";
    
    it("should render without error", () => {
        render(<GenericModal {...props} />);
        expect(screen.getByText("modal")).toBeTruthy();
    });

    it("should render with the info button", () => {
        render(<GenericModal titleIconName='info' {...props} />);
        expect(screen.getByText('modal').children[0].children[0].getAttribute('d')).toEqual(infoIcon);
    });

    it("should render with the help button", () => {
        render(<GenericModal titleIconName='help' {...props} />);
        expect(screen.getByText('modal').children[0].children[0].getAttribute('d')).toEqual(helpIcon);
    });

    it("should render with the warning button", () => {
        render(<GenericModal titleIconName='warning' {...props} />);
        expect(screen.getByText('modal').children[0].children[0].getAttribute('d')).toEqual(warningIcon);
    });

    it("should render with the error button", () => {
        render(<GenericModal titleIconName='error' {...props} />);
        expect(screen.getByText('modal').children[0].children[0].getAttribute('d')).toEqual(errorIcon);
    });
});