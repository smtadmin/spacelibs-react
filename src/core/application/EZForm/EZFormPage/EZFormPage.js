/*
 * File: EZFormPage
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Formatter for the EZForm page wrapper
 * File Created: Friday, 19th February 2021 2:05 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 4th March 2021 10:41 am
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import PropTypes from 'prop-types';

/**
 * Formatter for the EZForm page wrapper
 */
class EZFormPage extends React.Component {
    
    /**
     * Creates an instance of the EZFormPage component
     * @param {*} props 
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders the JSX return 
     *
     * @returns {*} - JSX element
     * @memberof EZFormPage
     */
    render() {
        return(
            <div className="form-page-wrapper" >
                <h2 className="form-header">{this.props.title}</h2>
                <p className="form-description">{this.props.description}</p>
                {this.props.questions &&
                    this.props.questions.map(question => (<QuestionBlock key={question.identifier} onValueChanged={this.props.onValueChanged} {...question}  />))
                }
            </div>
        );
    }


}

export default EZFormPage;

