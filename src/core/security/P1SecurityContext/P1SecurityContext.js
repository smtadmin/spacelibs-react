/*
 * File: /src/core/security/P1SecurityContext/P1SecurityContext.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Security Context to use for Platform 1 apps
 * File Created: Wednesday, 17th February 2021 4:01 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 17th February 2021 4:08 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';

const P1SecurityContext = React.createContext();
P1SecurityContext.displayName = "P1SecurityContext";

export default P1SecurityContext;