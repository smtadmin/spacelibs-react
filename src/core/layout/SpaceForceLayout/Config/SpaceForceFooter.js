/*
 * File: /src/core/layout/SpaceForceLayout/Config/Footer.js
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

import * as React from "react";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import Footer from "../Footer/Footer";
import BootstrapWrapper from "../BootstrapWrapper/BootstrapWrapper";

/**
 * Space Force Footer component
 *
 * @param {*} {themeConfig} props
 * @returns {*} Component
 */
export default function SpaceForceFooter({themeConfig}){
	const config = {
        // Bootstrap for the Mobile and Desktop footer content wrappers
        bootstrap: {
            mobile: "mobile-footer fixed-bottom d-md-none d-flex background-theme-main justify-content-between",
            desktop: "",
        },
        // Bootstrap and content to be injected in to the footer left
        left: {
            mobile: {
                content: themeConfig.footer.left.mobile,
                bootstrap: null,
            },
            desktop: {
                content: themeConfig.footer.left.desktop,
                bootstrap: null,
            },
        },
        // Bootstrap and content to be injected in to the footer center
        center: {
            mobile: {
                content: themeConfig.footer.center.mobile,
                bootstrap: null,
            },
            desktop: {
                content: themeConfig.footer.center.desktop,
                bootstrap: null,
            },
        },
        // Bootstrap and content to be injected in to the footer right
        right: {
            mobile: {
                content: themeConfig.footer.right.mobile,
                bootstrap: null,
            },
            desktop: {
                content: themeConfig.footer.right.desktop,
                bootstrap: null,
            },
        },
    };

	return (
        <Container fluid>
            {/* Desktop Footer */}
            <Footer
                bootstrap={config.bootstrap.desktop}
                left={
                    <BootstrapWrapper
                        sectionName='desktop-footer-left'
                        bootstrap={config.left.desktop.bootstrap}
                        content={config.left.desktop.content}
                    />
                }
                center={
                    <BootstrapWrapper
                        sectionName='desktop-footer-center'
                        bootstrap={config.center.desktop.bootstrap}
                        content={config.center.desktop.content}
                    />
                }
                right={
                    <BootstrapWrapper
                        sectionName='desktop-footer-right'
                        bootstrap={config.right.desktop.bootstrap}
                        content={config.right.desktop.content}
                    />
                }
            />
            {/* Mobile Footer */}
            <Footer
                bootstrap={config.bootstrap.mobile}
                left={
                    <BootstrapWrapper
                        sectionName='mobile-footer-left'
                        bootstrap={config.left.mobile.bootstrap}
                        content={config.left.mobile.content}
                    />
                }
                center={
                    <BootstrapWrapper
                        sectionName='mobile-footer-center'
                        bootstrap={config.center.mobile.bootstrap}
                        content={config.center.mobile.content}
                    />
                }
                right={
                    <BootstrapWrapper
                        sectionName='mobile-footer-right'
                        bootstrap={config.right.mobile.bootstrap}
                        content={config.right.mobile.content}
                    />
                }
            />
        </Container>
    );
}

SpaceForceFooter.propTypes = {
    themeConfig: PropTypes.any
};