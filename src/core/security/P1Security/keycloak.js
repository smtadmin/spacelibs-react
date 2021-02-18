/*
 * File: /src/core/security/P1SecurityContext/keycloak.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Keycloak configuration for our auth context
 * File Created: Wednesday, 17th February 2021 12:22 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 17th February 2021 4:48 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import Keycloak from 'keycloak-js';

/** This points to the P1 keycloak server */
const keycloakConfig = {
  realm: "SMT-store",
  "auth-server-url": "https://artificialis-machina.h4ck.me/auth/",
  "ssl-required": "external",
  resource: "spring-boot-app",
  "public-client": true,
  "confidential-port": 0,
  clientId: "spring-boot-app",
  url: "https://artificialis-machina.h4ck.me/auth/",
};

export default new Keycloak(keycloakConfig);
