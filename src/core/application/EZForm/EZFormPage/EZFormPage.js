/*
 * File: EZFormPage
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Formatter for the EZForm page wrapper
 * File Created: Friday, 19th February 2021 2:05 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Friday, 16th July 2021 2:06 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import PropTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useTheme } from "@material-ui/core/styles";

/**
 * Formatter for the EZForm page wrapper
 * 
 * @param {*} props Component props
 * @returns {*} Component
 */
function EZFormPage(props){
	const theme = useTheme();
	return (
        <div
            className='form-page-wrapper'
            css={css`
                color: ${theme.palette.text.primary};
            `}>
            <h2
                className='form-header'>
                {props.title}
            </h2>
            <p className='form-description'>{props.description}</p>
            <p className='required-page-header'>
                Required <span style={{ color: "red" }}>*</span>
            </p>
            {props.questions &&
                props.questions.map((question) => (
                    <QuestionBlock
                        key={question.identifier}
                        onValueChanged={props.onValueChanged}
                        {...question}
                    />
                ))}
        </div>
    );
}

EZFormPage.propTypes = {
	questions: PropTypes.arrayOf(
		PropTypes.any
	),
	title: PropTypes.string,
	formTitle: PropTypes.string,
	description: PropTypes.string,
	onValueChanged: PropTypes.func
};

export default EZFormPage;

