/*
 * File: TwoColumn.test
 * Version: 0.1.0
 * Project: react-test
 * Description: Testing suite for the Space Force Content Layouts Two Column Layout
 * File Created: Monday, 8th February 2021 12:34 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th March 2021 11:37 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import TwoColumn from './TwoColumn';
import React from 'react';
import { render } from '@testing-library/react';

/**
 * It renders the TwoColumn element without crashing
 */
it("Renders without crashing", () => {

    const element = render(<TwoColumn  />);
    expect(element).toBeTruthy();

});

/**
 * It renders a single element into the TwoColumn layout correctly
 */
it("Renders The Layout Correctly With One Element In Each Columnm", () => {

    const element = render(<TwoColumn colOne={<div>Hello World</div>} colTwo={<div>Goodbye World</div>} />);
    expect(element).toMatchSnapshot();
});

/**
 * It renders multiple elements into the TwoColumn layout correctly
 */
it("Renders The Layout Correctly With Multiple Element", () => {

    const element = render(
		<TwoColumn 
			colOne={[
				<div key={1}>One</div>, 
				<div key={2}>Two</div>, 
				<div key={3} >Three</div>
			]} 
		/>);
    expect(element).toMatchSnapshot();
});

/**
 * It renders multiple elements into the TwoColumn layout correctly with bootstrap overrides
 */
it("Renders The Layout Correctly With Overridden Bootstrap", () => {

    const element = render(
        <TwoColumn
            colOneBootstrap='d-none'
            colTwoBootstrap='d-none'
            colOne={[
                <div key={1}>One</div>,
                <div key={2}>Two</div>,
                <div key={3}>Three</div>,
            ]}
        />
    );
    expect(element).toMatchSnapshot();
});