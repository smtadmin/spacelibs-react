/*
 * File: BootstrapWrapper
 * Version: 0.1.0
 * Project: react-test
 * Description: A React component that wraps whatever is passed to it in the specified bootstrap wrappers
 * File Created: Wednesday, 3rd February 2021 1:06 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th March 2021 11:57 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

/**
 * Class for wraping components in bootstrap wrappers
 */
class BootstrapWrapper extends React.Component {

    /**
     * Creates an instance of a bootstrap wrapper
     * @param {*} props The props recieved by the component
     */
    constructor(props) {
        super(props);
        this.buildSections();
    }

    /**
     * Checks wraps elements in divs and assigns each element a specific key and class so that they are easily manipulated using css
     */
    buildSections() {
        const newElements = [];
        let count = 0;
        if (Array.isArray(this.props.content)) {
            for (const element of this.props.content) {
                newElements.push(<div key={this.props.sectionName + "" + count} className={this.props.sectionName + "-header-element-" + count + " col"}>{element}</div>);
                count++;
            }
        } else {
            newElements.push(<div key={this.props.sectionName + "" + count} className={this.props.sectionName + "-header-element-" + count + " col"}>{this.props.content}</div>);
        }
        this.content = [<Row key={this.props.sectionName} className={this.props.sectionName + "-direction-wrapper " + this.props.bootstrap}>{newElements}</Row>];
    }

	/**
	 * Renders BootstrapWrapper
	 *
	 * @returns {*} React Components 
	 * @memberof BootstrapWrapper
	 */
	render() {
        return this.content;
    }

}

/** Sets Default Props */
BootstrapWrapper.defaultProps = {
    bootstrap: ""
};
/** Prop Validators */
BootstrapWrapper.propTypes = {
    content: PropTypes.any,
    sectionName: PropTypes.string,
    bootstrap: PropTypes.string
};

export default BootstrapWrapper;