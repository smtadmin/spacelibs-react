/*
 * File: /src/core/survey/SurveyManager/SurveyManager.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Wednesday, 10th February 2021 1:11 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 11th February 2021 3:06 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import QuestionBlock from '../QuestionBlock';
import Button from '../../input/Button';

const validateOnTheFly = true;

class SurveyManager extends React.Component {
	constructor(props){
		super(props);
	
		let questions = this.getTestQuestions();
		for(var x = 0; x < questions.length; x++){
			questions[x].value = [];
			questions[x].hasError = false;
			questions[x].subText = "";
		}

		this.state = {
			questions: questions
		};
		console.log(questions);
	}

	onValueChanged(questionId, value){
		console.log("Question " + questionId, value);
		let questions = this.state.questions;
		for(var x = 0; x < questions.length; x++){
			var question = questions[x];
			if(question.identifier === questionId){
				question.value = value;

				if(validateOnTheFly){

					const validationObject = this.validate(question);
					question.hasError = validationObject.hasError;
					question.subText = validationObject.errorMessage;
				}
			}
		}

		this.setState(questions);
	}

	validate(question){
		var hasError = false;
		var errorMessage = "";
		if(question.type === "text" && question.isRequired){
			if( question.value && question.value.constructor === Array && question.value.length === 1 && question.value[0].length > 0){
				var s = "";
			}else{
				hasError = true;
				errorMessage = "This field is required";
			}
		}
		return {
			hasError: hasError,
			errorMessage: errorMessage
		};
	}

	onSubmit(){
		var questions = this.state.questions;
		var errors = 0;
		for(var x = 0; x < questions.length; x++){
			var question = questions[x];
			const validateObject = this.validate(question);
			if(validateObject.hasError){
				errors++;
			}

			question.hasError = validateObject.hasError;
			question.subText = validateObject.errorMessage;
		}

		this.setState({
			questions: questions
		});

		if(errors > 0){
			console.log("Errors...");
		}else{
			console.log("Success!");
		}
	}

	render(){
		return <>{this.state.questions.map((question) => 
			<QuestionBlock key={question.identifier} {...question} onValueChanged={this.onValueChanged.bind(this)}/>
		)}
		<br></br>
		<Button onClick={this.onSubmit.bind(this)}>Click me</Button>
		</>;
	}

	getTestQuestions(){
		var values = getValueArrayForOffenses([
			{id: 77, text: "Principals"},
			{id: 78, text: "Accessory after the fact"},
			{id: 79, text: "Conviction of offense, lesser included offense, and attempts"},
			{id: 80, text: "Attempts"},
			{id: 81, text: "Conspiracy"},
			{id: 82, text: "Soliciting commission of offenses"},
			{id: 83, text: "Malingering"},
			{id: 84, text: "Breach of medical quarantine"},
			{id: 85, text: "Desertion"},
			{id: 86, text: "Absence without leave"},
			{id: 87, text: "Missing movement"}
		]);

		/** */
		function getValueArrayForOffenses(arr){
			var output = [];
			for(var x = 0; x < arr.length; x++){
				var a = arr[x];
				output.push({
					identifier: a.id + "",
					displayText: "Art. " + a.id + " " + a.text
				});
			}
			return output;
		}

		return [{
			number: 1,
			identifier: "1",
			type: "date",
			label: "Date Action Completed",
			isRequired: true,
			config: {}
		},{
			number: 2,
			identifier: "2",
			type: "choice",
			label: "Type of Action",
			isRequired: true,
			config: {
				isMultiple: false,
				options: [{
					identifier: "1",
					displayText: "Letter of Counseling (LOC)"
				},{
					identifier: "2",
					displayText: "Letter of Admonishment (LOA)"
				},{
					identifier: "3",
					displayText: "Letter of Reprimand (LOR)"
				}]
			}
		},{
			number: 3,
			identifier: "3",
			type: "choice",
			label: "Underlying Offense(s)",
			isRequired: true,
			config: {
				isMultiple: false,
				options: values
			},
		},{
			number: 4,
			identifier: "4",
			type: "choice",
			label: "Unit",
			isRequired: true,
			config: {
				isMultiple: true,
				options: [{
					identifier: "A",
					displayText: "45th"
				},{
					identifier: "B",
					displayText: "30th"
				},{
					identifier: "C",
					displayText: "25th"
				},{
					identifier: "D",
					displayText: "10th"
				},{
					identifier: "E",
					displayText: "50th"
				}]
			}
		},{
			number: 5,
			identifier: "5",
			type: "choice",
			label: "Base",
			isRequired: true,
			config: {
				isMultiple: true,
				options: [{
					identifier: "A",
					displayText: "Buckley Garrison"
				},{
					identifier: "B",
					displayText: "Patrick Space Force Base"
				},{
					identifier: "C",
					displayText: "Peterson-Schriever Garrison"
				},{
					identifier: "D",
					displayText: "Vandenberg Air Force Base"
				}]
			}
		},{
			number: 11,
			identifier: "11",
			type: "text",
			format: "number",
			label: "Age Issuing",
			isRequired: true,
			config: {}
		}];
	}
}

export default SurveyManager;