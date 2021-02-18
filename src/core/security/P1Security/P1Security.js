/*
 * File: /src/core/security/P1SecurityContext/P1Security.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: This should wrap any components you want protected and to have access to security info
 * File Created: Wednesday, 17th February 2021 12:19 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 17th February 2021 5:13 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web'; 
import keycloak from './keycloak';
import PropTypes from 'prop-types';
import P1SecurityProvider from '../P1SecurityProvider';

/**
 * P1 Security component
 * @param {*} props - Component props 
 * @returns {object} - Keycloak Security context provider
 */
function P1Security(props){

	/** Set initial options for keycloak */
	let initOptions;
	if(props.requireLogin !== null && props.requireLogin !== undefined && props.requireLogin === true){
		initOptions = {
			onLoad: "login-required",
			checkLoginIframe: false,
		};
	}else{
		initOptions = {
			onLoad: "check-sso",
			checkLoginIframe: false,
		};
	}

	return (
	<ReactKeycloakProvider 
		authClient={keycloak} 
		initOptions={initOptions}>
		<P1SecurityProvider>
			{props.children}
		</P1SecurityProvider>
	</ReactKeycloakProvider>);
}

/**
 * Default props
 */
P1Security.defaultProps = {
	requireLogin: true
};

/**
 * Accepted props
 */
P1Security.propTypes = {
	children: PropTypes.any,
	requireLogin: PropTypes.bool
};

export default P1Security;