/*
 * File: /src/core/layout/SpaceForceLayout/Config/Themes.js
 * Version: 1.0.23
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 12th July 2021 11:30 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 21st July 2021 4:05 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import copy from 'fast-copy';

/**
 * Gets the current theme
 * @param {*} override Theme to override the base theme with
 * @returns {*} override theme
 */
function getThemeWithOverride(override){

	/**
	 * Recursively merges objects
	 *
	 * @param {*} original Original object
	 * @param {*} updated Updated object
	 */
	function mergeObjects(original, updated){
		for (let attribute in updated){
			if (original[attribute] == null || typeof updated[attribute] !== "object"){
				original[attribute] = updated[attribute];
			}else{
				mergeObjects(original[attribute], updated[attribute]);
			}
		}	
	}

	let copyOfOriginal = copy(baseTheme);
	mergeObjects(copyOfOriginal, override);
	return copyOfOriginal;
}

/* This applies to all Themes */
const baseTheme = {
    palette: {
        primary: {
            light: "#29749D",
            main: "#034E77",
            dark: "#303F9F",
            background: "#034E7708",
            contrastText: "#FFFFFF",
            mainOriginal: "#034E77",
            lightOriginal: "#29749D",
        },
        secondary: {
            light: "#DDDDDD",
            main: "#DDD",
            dark: "#919191",
            background: "#B7B7B708",
            contrastText: "#000000",
        },
        error: {
            light: "#E57373",
            main: "#F44336",
            dark: "#D32F2F",
            background: "#F4433610",
            contrastText: "#FFFFFF",
        },
        warning: {
            light: "#FFB74D",
            main: "#FE9939", // Was #FF9800
            dark: "#F57C00",
            background: "#FF980010",
            contrastText: "#F5F5F5", // Was #00000087
        },
        info: {
            light: "#64B576",
            main: "#2196F3",
            dark: "#1976D2",
            background: "#2196F310",
            contrastText: "#FFFFFF",
        },
        success: {
            light: "#81C784",
            main: "#47AF58", // Was #4CAF50
            dark: "#388E3C",
            background: "#4CAF5010",
            contrastText: "#F5F5F5", // Was #00000087
        },
    },
};

/* Light theme only */
export const light = getThemeWithOverride({
    palette: {
        type: "light",
        text: {
            primary: "#000000", // Was #00000087, used on Landing page top label and tile icon, probably elsewhere too
            secondary: "#000000CC", // Was #00000054, used on Landing page form descriptions
            disabled: "#00000038",
            hint: "#00000038",
        },
        background: {
            paper: "#FFFFFF",
            default: "#EEEEEE", // Was #FAFAFA, used on landing page tile wrapper
            divider: "#00000030",
        },
		extra: {
			tileShadow: "#BBBBBB"
		}
    },
	overrides: {
		MuiMobileStepper: {
			root: {
				backgroundColor: "#FFFFFF",
			}
		},
		MuiStepIcon: {
            root: {
                background: "#FFFFFF",
            },
        },
	}
});

/* Dark theme only */
export const dark = getThemeWithOverride({
    palette: {
        type: "dark",
        text: {
            primary: "#FFFFFF",
            secondary: "#FFFFFFDD", // Was #FFFFFF70
            disabled: "#FFFFFF60",
        },
        background: {
            paper: "#424242",
            default: "#303030",
            divider: "#FFFFFF30",
        },
        // action: {
        //     active: "#FFFFFF",
        //     hover: "#424242", // Was #FFFFFF92
        //     selected: "#FFFFFF84",
        //     disabled: "#FFFFFF70",
        //     disabledBackground: "#FFFFFF88",
        // },
        primary: {
            light: "#64B576",
            main: "#2196F3",
            dark: "#1976D2",
            background: "#2196F310",
            contrastText: "#FFFFFF",
        },
        secondary: {
            light: "#999",
            main: "#777",
            dark: "#555",
            contrastText: "#FFF",
        },
        extra: {
            tileShadow: "#222",
        },
    },
    overrides: {
        MuiMobileStepper: {
            root: {
                backgroundColor: "#424242",
            },
        },
        MuiMenu: {
            list: {
                backgroundColor: "#303030",
            },
        },
    },
});

