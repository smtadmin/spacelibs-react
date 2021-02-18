/*
 * File: /src/core/security/P1SecurityContext/P1SecurityContext.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: This component should be at the top of the react tree to give children ability to pull auth information
 * File Created: Wednesday, 17th February 2021 11:23 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 17th February 2021 5:14 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { reactKeycloakWebContext } from "@react-keycloak/web/lib/context";
import P1SecurityContext from '../P1SecurityContext';

/**
 * Platform 1 Security Context component
 */
class P1SecurityProvider extends React.Component {

	/**
	 * Creates an instance of P1SecurityContext.
	 * @param {*} props - Component Props
	 * @memberof P1SecurityProvider
	 */
	constructor(props){
		super(props);
	}

	/**
	 * Renders component
	 *
	 * @returns {*} Child components wrapped in a P1SecurityContext
	 * @memberof P1SecurityProvider
	 */
	render(){
		let secContext = this.context;
		let values = {};
		let auth = secContext.authClient;

		/** Transform 3rd party context values to our context values */
		values.isInitialized = secContext.initialized;
		values.isLoggedIn = auth.authenticated;
		values.clearTokens = auth.clearToken;
		values.updateTokens = auth.updateToken;
		values.login = auth.login;
		values.logout = auth.logout;

		if(auth.idToken){
			values.tokens = {
				idToken: auth.idToken,
				refreshToken: auth.refreshToken,
				accessToken: auth.token,
				idTokenParsed: auth.idTokenParsed,
				refreshTokenParsed: auth.refreshTokenParsed,
				accessTokenParsed: auth.tokenParsed,
			};
		}else{
			values.tokens = {};
		}
		
		if(auth.idTokenParsed){
			values.user = {
				email: auth.idTokenParsed.email,
				firstName: auth.idTokenParsed.given_name,
				lastName: auth.idTokenParsed.family_name,
				fullName: auth.idTokenParsed.name
			};
		}else{
			values.user = {};
		}
		
		return <P1SecurityContext.Provider value={values}>
			{this.props.children}
		</P1SecurityContext.Provider>;
	}
} 

P1SecurityProvider.contextType = reactKeycloakWebContext;

/**
 * Accepted props
 */
P1SecurityProvider.propTypes = {
	children: PropTypes.any,
};

export default P1SecurityProvider;