/*
 * File: /src/core/layout/SpaceForceLayout/MuiTheme.js
 * Version: 1.0.23
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 12th July 2021 10:35 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 29th July 2021 10:53 am
 * Modified By: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import * as React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PropTypes from 'prop-types';
import { dark, light } from '../SpaceForceLayout/Config/Themes';
import MuiThemeContext from './MuiThemeContext';

/**
 * Material UI Theme wrapper
 *
 * @param {*} props Component props
 * @returns {*} React component
 */
export default function MuiTheme(props) {
  const defaultTheme = getDefaultTheme();
  const [theme, setTheme] = React.useState(defaultTheme);
  const icon =
    theme === 'light' ? (
      <Brightness3Icon htmlColor="white" />
    ) : (
      <Brightness7Icon htmlColor="white" />
    );

  const selectedThemeObject = theme === 'light' ? light : dark;
  const contextValue = {
    icon,
    mode: theme,
    toggleTheme: () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      window.localStorage.setItem('theme', newTheme);
      document.body.style.backgroundColor =
        selectedThemeObject.palette.background.main;
    },
    theme: selectedThemeObject
  };

  React.useEffect(() => {
    document.body.style.backgroundColor =
      selectedThemeObject.palette.background.paper;
  });

  return (
    <MuiThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={createTheme(contextValue.theme)}>
        {props.children}
      </ThemeProvider>
    </MuiThemeContext.Provider>
  );
}

/**
 * Gets Default Theme
 *
 * @returns {*} Theme name
 */
function getDefaultTheme() {
  const localTheme = window.localStorage.getItem('theme');
  if (localTheme) {
    return localTheme;
  } else {
    return 'light';
  }
}

MuiTheme.propTypes = {
  children: PropTypes.any
};
