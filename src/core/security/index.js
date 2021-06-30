/*
 * File: /src/core/security/index.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Index files are used to make exporting easier
 * File Created: Wednesday, 17th February 2021 1:51 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 30th June 2021 1:55 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

/*
 * File: /src/core/security/SLSecurityProvider.js
 * Version: 1.0.17
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Friday, 25th June 2021 10:34 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 25th June 2021 1:28 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import APIContext from '../api/APIContext';


const SLSecurityContext = React.createContext();
SLSecurityContext.displayName = "SLContext";

/**
 * SLSecurityContext
 *
 * @param {*} {children, securityAPI}
 * @returns {*} React component
 */
function SLSecurityProvider({ children, api }) {
    const [securityData, setSecurityData] = React.useState({loaded: false});
    const apiContext = React.useContext(APIContext);

    React.useEffect(() => {
        apiContext.read(api, null, (response) => {
            setSecurityData({
                ...response.data,
                loaded: true,
            });
        });
    }, [api]);

    const contextValue = {...securityData};
    return (
        <SLSecurityContext.Provider value={contextValue}>
            {children}
        </SLSecurityContext.Provider>
    );
}
SLSecurityProvider.propTypes = {
    children: PropTypes.any,
    api: PropTypes.string,
};

export {
	SLSecurityContext, SLSecurityProvider
};