/*
 * File: /src/core/security/index.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Index files are used to make exporting easier
 * File Created: Wednesday, 17th February 2021 1:51 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 17th February 2021 4:09 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import P1Security from './P1Security';
import P1SecurityProvider from './P1SecurityProvider';
import P1SecurityContext from './P1SecurityContext';

export default {
	P1Security: P1Security,
	P1SecurityContext: P1SecurityContext,
	P1SecurityProvider: P1SecurityProvider,
};

export {
	P1Security,
	P1SecurityContext,
	P1SecurityProvider
};