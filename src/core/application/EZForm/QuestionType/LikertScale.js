/*
 * File: /src/core/application/EZForm/QuestionType/LikertScale.js
 * Version: 1.0.24
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Friday, 23rd July 2021 10:21 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 16th August 2021 10:36 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '../../../input/RadioGroup';

import { useTheme } from '@material-ui/core/styles';
import styled from '@emotion/styled';

const SiblingDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChildSiblingDiv = styled.div`
  margin-top: auto;
  padding-bottom: 15px;
`;

/**
 * LikertScale component
 *
 * @param {*} props Component props
 * @returns {*} React element
 */
function LikertScale(props) {
  const theme = useTheme();

  const config = {
    options: []
  };

  for (let x = 1; x <= 5; x++) {
    config.options.push({
      identifier: '' + x,
      displayText: '' + x,
      isDisabled: props.isDisabled
    });
  }

  console.log(responseSet, props);

  return (
    <div
      style={{
        color: theme.palette.text.primary,
        display: 'flex'
      }}>
      <SiblingDiv>
        <ChildSiblingDiv>{responseSet[props.responseSet][0]}</ChildSiblingDiv>
      </SiblingDiv>
      <RadioGroup
        row
        value={props.value}
        labelPlacement="top"
        config={config}
        onValueChanged={(val) => {
          console.log(val);
          props.onValueChanged(val);
        }}
      />
      <SiblingDiv>
        <ChildSiblingDiv>{responseSet[props.responseSet][4]}</ChildSiblingDiv>
      </SiblingDiv>
    </div>
  );
}

LikertScale.defaultProps = {
  responseSet: 'Agreement',
  isDisabled: false
};

LikertScale.propTypes = {
  value: PropTypes.array,
  onValueChanged: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  responseSet: PropTypes.oneOf([
    'Frequency',
    'Quality',
    'Intensity',
    'Agreement',
    'Approval',
    'Awareness',
    'Importance',
    'Familiarity',
    'Satisfaction',
    'Performance'
  ]).isRequired
};

const responseSet = {
  Frequency: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  Quality: ['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'],
  Intensity: ['None', 'Very mild', 'Mild', 'Moderate', 'Severe'],
  Agreement: [
    'Strongly disagree',
    'Disagree',
    'Neither agree nor disagree',
    'Agree',
    'Strongly Agree'
  ],
  Approval: [
    'Strongly disapprove',
    'Disapprove',
    'Neutral',
    'Approve',
    'Strongly approve'
  ],
  Awareness: [
    'Not at all aware',
    'Slightly aware',
    'Moderately aware',
    'Very aware',
    'Extremely aware'
  ],
  Importance: [
    'Not at all important',
    'Slightly aware',
    'Moderately aware',
    'Very aware',
    'Extremely aware'
  ],
  Familiarity: [
    'Not at all familiar',
    'Slightly familiar',
    'Moderately familiar',
    'Very familiar',
    'Extremely familiar'
  ],
  Satisfaction: [
    'Not at all satisfied',
    'Slightly satisfied',
    'Moderately satisfied',
    'Very satisfied',
    'Completely satisfied'
  ],
  Performance: [
    'Far below standards',
    'Below standards',
    'Meets standards',
    'Above standards',
    'Far above standards'
  ]
};

export default LikertScale;
