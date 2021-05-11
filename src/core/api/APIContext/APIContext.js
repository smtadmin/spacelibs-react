/*
 * File: /src/core/api/APIContext/APIContext.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: API Context
 * File Created: Wednesday, 17th February 2021 4:49 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 30th April 2021 9:30 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";

const APIContext = React.createContext();
APIContext.displayName = "APIContext";

/**
 * read();
 */
export default APIContext;
