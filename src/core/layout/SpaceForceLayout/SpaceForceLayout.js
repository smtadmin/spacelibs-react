/*
 * File: SpaceForceLayout
 * Version: 0.1.0
 * Project: react-test
 * Description: SMT Space Force Layout
 * File Created: Wednesday, 27th January 2021 1:30 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Monday, 13th September 2021 1:12 pm
 * Modified By: Chris Scarola (chris.scarola@siliconmtn.com)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './SpaceForceLayout.css';
import SpaceForceHeader from './Config/SpaceForceHeader';
import SpaceForceFooter from './Config/SpaceForceFooter';

/**
 * @param props
 */
function SpaceForceLayout(props) {
  return (
    <>
      {/* Header Sections */}
      <SpaceForceHeader themeConfig={props.ThemeConfig} />

      {/* This is where the content is injected */}
      {props.children}

      {/* Footer Sections */}
      <SpaceForceFooter themeConfig={props.ThemeConfig} />
    </>
  );
}

/**
 * Accepted Prop Types
 */
SpaceForceLayout.propTypes = {
  ThemeConfig: PropTypes.object,
  children: PropTypes.any
};

export default SpaceForceLayout;
