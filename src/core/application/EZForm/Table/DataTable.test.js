/*
 * File: /src/core/application/EZForm/Table/DataTable.test.js
 * Version: 1.0.42
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 23rd November 2021 3:14 pm
 * Author: Daniel Fong (daniel.fong@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 23rd November 2021 3:16 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import DataTable from './DataTable';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Datatable', () => {
  it('Renders with props', () => {
    const { baseElement } = render(<DataTable rows={[]} columns={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
