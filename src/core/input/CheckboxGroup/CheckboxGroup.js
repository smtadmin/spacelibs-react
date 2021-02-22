/*
 * File: /src/core/input/CheckboxGroup/CheckboxGroup.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Checkbox Field input
 * File Created: Monday, 8th February 2021 1:27 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 22nd February 2021 10:25 am
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
*/

import React from 'react';
import PropTypes from 'prop-types';import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '../Tooltip';

/**
 * Class for Checkbox buttons
 */
class CheckboxGroup extends React.Component {	
	
	/**
	 * Creates an instance of CheckboxGroup.
	 * @param {object} props - Component props
	 * @memberof CheckboxGroup
	 */
	constructor(props){
		super(props);		
		var selectedValues = [];
		for(var y = 0; y < props.value.length; y++){
			var val = props.value[y];
			selectedValues.push(val.identifier);
		}		

		var valueObjects = [];
		for(var x = 0; x < props.config.options.length; x++){
			var value = props.config.options[x];
			
			if(value.isSelected === undefined){
				value.isSelected = false;
			}
			
			if(value.isDisabled === undefined){
				value.isDisabled = false;
			}			
			
			if(selectedValues.includes(value.identifier)){
				value.isSelected = true;
			}
			valueObjects.push(value);
		}		
		
		this.state = {
			values: valueObjects
		};
	}	
	
	/**
	 * Event Handler for if a checkbox value is changed.  Calls this.props.onValueChanged and returns selected values
	 * 
	 * @param {object} identifier - The name of the checkbox that was selected
	 * @memberof CheckboxGroup
	 */
	onValueChanged(identifier){
		var selectedValues = [];		
		var values = this.state.values;
		for(var x = 0; x < values.length; x++){
			var value = values[x];
			if(value.identifier === identifier){
				value.isSelected = !value.isSelected;
			}
			if(value.isSelected){
				selectedValues.push(value);
			}
		}
		this.setState({
			values: values
		});
		this.props.onValueChanged(selectedValues);
	}	
	
	/**
	 * Renders CheckboxGroup component
	 *
	 * @returns {object} - Form Group component with checkboxes inside 
	 * @memberof CheckboxGroup
	 */
	render(){
		let placement = this.props.labelPlacement;
		let muiPlacement;		
		
		/* Converts our placements to material-ui placements */
		if(placement === "right"){ muiPlacement = "end"; } 
		else if(placement === "left"){ muiPlacement = "start"; }
		else{ muiPlacement = placement; }		
		
		return <FormGroup row={this.props.alignment === 'horizontal' ? true : false}>
		{this.state.values.map(val => 
				<FormControlLabel
				key={val.identifier}
				label={<div>
					<span>{val.displayText}</span>
					<Tooltip text={val.helperText} />
					</div>} 
				value={val.identifier} 
				labelPlacement={muiPlacement}
				control={<Checkbox 
					data-testid={"checkbox"}
					id='checkbox'
					color={this.props.color} 
					disabled={val.isDisabled} 
					checked={val.isSelected} 
					onChange={this.onValueChanged.bind(this, val.identifier)} 
					name={val.identifier} 
				/>}
			/>
		)}
		</FormGroup >;
	}
}

/**
 * Default Props
 */
CheckboxGroup.defaultProps = {
	color: "default",
	alignment: 'vertical',
	labelPlacement: "right"
};

/**
 * Expected Props
 */
CheckboxGroup.propTypes = {
	value: PropTypes.arrayOf(PropTypes.any),
	hasError: PropTypes.bool,
	subText: PropTypes.string,
	alignment: PropTypes.oneOf(["vertical", "horizontal"]),
	color: PropTypes.string,
	labelPlacement: PropTypes.oneOf(["left", "top", "right", "bottom"]),
	variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
	inputLabel: PropTypes.string,
	placeholder: PropTypes.string,
	onValueChanged: PropTypes.func.isRequired,
	hideSelectedValueInInput: PropTypes.bool,
	config: PropTypes.shape({
		isMultiple: PropTypes.bool,
		maxCount: PropTypes.number, // Also used by Text
		alternateResponseAllowed: PropTypes.bool,
		options: PropTypes.arrayOf(PropTypes.shape({
			identifier: PropTypes.string.isRequired,
			displayText: PropTypes.string.isRequired,
			helperText: PropTypes.string,
			isSelected: PropTypes.bool,
			isDisabled: PropTypes.bool
		})).isRequired
	})
};

export default CheckboxGroup;