/*
 * File: EZFormPage
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Formatter for the EZForm page wrapper
 * File Created: Friday, 19th February 2021 2:05 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 23rd February 2021 9:19 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import QuestionBlock from '../QuestionBlock/QuestionBlock';

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
                <h3 className="form-header">{this.props.title}</h3>
                <h4 className="form-description">{this.props.description}</h4>
                {this.props.questions &&
                    this.props.questions.map(question => (<QuestionBlock key={question.identifier} onValueChanged={this.props.onValueChanged} {...question}  />))
                }
            </div>
        );
    }


}

export default EZFormPage;

