/*
 * File: config
 * Version: 0.1.0
 * Project: react-test
 * Description: File that exports basic data that will be displayed on every page
 * File Created: Thursday, 4th February 2021 1:37 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 4th February 2021 3:12 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import PlanitLogo from '../Components/PlanitLogo/PlanitLogo';


const ThemeConfig = {
    header : {
        left: <PlanitLogo />
    },
    footer : {
        left: "Footer left",
        center: "Footer center",
        right: "Footer right",
    }
}

 export default ThemeConfig;