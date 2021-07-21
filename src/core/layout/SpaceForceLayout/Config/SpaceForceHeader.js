/*
 * File: /src/core/layout/SpaceForceLayout/Config/Header.js
 * Version: 1.0.23
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 12th July 2021 11:05 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 12th July 2021 11:29 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import * as React from 'react';
import Container from "react-bootstrap/Container";
import Header from "../Header/Header";
import BootstrapWrapper from "../BootstrapWrapper/BootstrapWrapper";
import PropTypes from 'prop-types';

/**
 * gets Header object
 *
 * @param {*} themeConfig Theme config object
 * @returns {*} Object 
 */
export default function SpaceForceHeader({themeConfig}){

	const config = {
		// Bootstrap for the Mobile and Desktop header content wrappers
		bootstrap: {
			mobile:
				"mobile-header fixed-bottom d-md-none background-theme-main",
			desktop:
				"desktop-header d-none d-md-flex background-theme-main white",
		},
		// Bootstrap and content to be injected in to the header left
		left: {
			mobile: {
				content: themeConfig.header.left.mobile,
				bootstrap: null,
			},
			desktop: {
				content: themeConfig.header.left.desktop,
				bootstrap: null,
			},
		},
		// Bootstrap and content to be injected in to the header center
		center: {
			mobile: {
				content: themeConfig.header.center.mobile,
				bootstrap: null,
			},
			desktop: {
				content: themeConfig.header.center.desktop,
				bootstrap: "float-right",
			},
		},
		// Bootstrap and content to be injected in to the header right
		right: {
			mobile: {
				content: themeConfig.header.right.mobile,
				bootstrap: null,
			},
			desktop: {
				content: themeConfig.header.right.desktop,
				bootstrap: null,
			},
		},
	};

	return (
        <Container fluid className='px-0'>
            {/* Header Desktop */}
            <Header
                bootstrap={config.bootstrap.desktop}
                left={
                    <BootstrapWrapper
                        sectionName='desktop-header-left'
                        bootstrap={config.left.desktop.bootstrap}
                        content={config.left.desktop.content}
                    />
                }
                center={
                    <BootstrapWrapper
                        sectionName='desktop-header-center'
                        bootstrap={config.center.desktop.bootstrap}
                        content={config.center.desktop.content}
                    />
                }
                right={
                    <BootstrapWrapper
                        sectionName='desktop-header-right'
                        bootstrap={config.right.desktop.bootstrap}
                        content={config.right.desktop.content}
                    />
                }
            />
            {/* Header Mobile */}
            <Header
                bootstrap={config.bootstrap.mobile}
                left={
                    <BootstrapWrapper
                        sectionName='mobile-header-left'
                        bootstrap={config.left.mobile.bootstrap}
                        content={config.left.mobile.content}
                    />
                }
                center={
                    <BootstrapWrapper
                        sectionName='mobile-header-center'
                        bootstrap={config.center.mobile.bootstrap}
                        content={config.center.mobile.content}
                    />
                }
                right={
                    <BootstrapWrapper
                        sectionName='mobile-header-right'
                        bootstrap={config.right.mobile.bootstrap}
                        content={config.right.mobile.content}
                    />
                }
            />
        </Container>
    );
}

SpaceForceHeader.propTypes = {
	themeConfig: PropTypes.any
};