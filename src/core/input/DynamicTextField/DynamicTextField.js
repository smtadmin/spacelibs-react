/*
 * File: /src/page/Admin/Questions/DynamicTextField/DynamicTextField.js
 * Version: 0.0.1
 * Project: ezform-webapp
 * Description: Dynamic Text Field
 * File Created: Friday, 14th May 2021 4:03 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 17th May 2021 11:20 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';

/**
 * Dynamic TextField component
 * 
 * @param {*} props Component props
 * @returns {*} React element 
 */
function DynamicTextField(props){
	if (props.isEditing) {
        return (
            <div className={"dynamic-label " + props.className}>
                <TextField
					multiline={props.multiline}
                    hasError={props.hasError}
                    subText={props.subText}
                    inputProps={{ style: { 
						fontSize: props.fontSize + "px" } 
					}}
                    autoFocus
                    className={"input"}
                    onValueChanged={(text) => {
                        props.callbacks.onChange(props.identifier, text);
					}}
					onFocus={(event) => {
						if (props.selectOnFocus) event.target.select();
					}}
                    onBlur={() => {
                        props.callbacks.onBlur(props.identifier);
                    }}
                    value={props.value}
                />
            </div>
        );
    } else if (props.canEdit) {
        return (
            <div
                style={{
                    fontSize: props.fontSize,
                    height: props.fontSize + props.bottomBarOffset + "px",
                }}
                onClick={() => {
                    props.callbacks.onFocus(props.identifier);
                }}
                className={"dynamic-label text can-edit " + props.className}>
                {props.value}
            </div>
        );
    } else {
        return (
            <div
                className={"dynamic-label text " + props.className}
                style={{
                    fontSize: props.fontSize,
                }}>
                {props.value}
            </div>
        );
    }
}

DynamicTextField.defaultProps = {
    fontSize: 16,
	bottomBarOffset: 10,
	className: ""
};

DynamicTextField.propTypes = {
	className: PropTypes.string,
    value: PropTypes.string.isRequired,
    hasError: PropTypes.bool,
	subText: PropTypes.string,
	fontSize: PropTypes.number,
	bottomBarOffset: PropTypes.number,
	multiline: PropTypes.bool,
    canEdit: PropTypes.bool,
    isEditing: PropTypes.bool,
	identifier: PropTypes.string,
	selectOnFocus: PropTypes.bool,
    callbacks: PropTypes.shape({
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
    }),
};

export default DynamicTextField;