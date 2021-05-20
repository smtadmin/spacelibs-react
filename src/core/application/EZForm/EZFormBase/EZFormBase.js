/*
 * File: /src/core/application/EZForm/EZFormBase/EZFormBase.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: This is a base EZForm component
 * File Created: Tuesday, 27th April 2021 4:00 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 12th May 2021 10:26 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from "react";
import PropTypes from "prop-types";

import EZFormPage from "../EZFormPage/EZFormPage";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MessageBox from "../../../notification/MessageBox";
import EZFormValidator from "../EZFormValidator/EZFormValidator";

import EZFormResponseParser from '../EZFormResponseParser/EZFormResponseParser';
/**
 * EZForm base component
 */
class EZFormBase extends React.Component {
	
	/**
	 * Creates an instance of EZFormBase.
	 * @param {*} props - Component props
	 * @memberof EZFormBase
	 */
	constructor(props) {
		super(props);
		
		const data = this.formatData(props.unformattedFormData);
        this.state = {
            currentPage: 0,
            showModal: false,
            modalMessage: "",
            modalTitle: "",
            data: data,
        };
    }

	/**
	 * Runs when a component is mounted
	 *
	 * @memberof EZFormBase
	 */
	componentDidMount() {
        const formattedData = this.formatData(this.props.unformattedFormData);
        let previousState = this.state;
        previousState.data = formattedData;
		this.setState(previousState);
    }

    /**
     *Prompts a modal to pop up
     *
     * @param {*} title title to add to the modal
     * @param {*} message message to add to the modal
     * @memberof EZForm
     */
    prompt(title, message) {
        let prevState = this.state;
        prevState.showModal = true;
        prevState.modalMessage = message;
        prevState.modalTitle = title;
        this.setState(prevState);
    }

    /**
     * Method called when a prompted modal is closed
     *
     * @memberof EZForm
     */
    onCloseModal() {
        let prevState = this.state;
        prevState.showModal = false;
        prevState.modalMessage = "";
        this.setState(prevState);
    }

    /**
     * Method called when a questions value changes
     *
     * @param {*} questionId Id for the question
     * @param {*} value value for the question
     * @memberof EZForm
     */
    onValueChanged(questionId, value) {
        let prevState = this.state;
        let breakOut = false;
        for (var x = 0; x < prevState.data.pages.length; x++) {
            let page = prevState.data.pages[x];
            for (var y = 0; y < page.questions.length; y++) {
                let question = page.questions[y];
                if (question.identifier === questionId) {
                    question.value = value;
                    question.isValid = true;
                    question.errorMessage = null;
                    breakOut = true;
                    break;
                }
            }
            if (breakOut) {
                break;
            }
        }

        this.setState(prevState);
    }

    /**
     * Formats Backend data for front end consumption
     *
     * @param {*} data - javascript object in the format the backend serves
     * @returns {*} formatted data object
     * @memberof EZForm
     */
    formatData(data) {
        let count = 1;
        data.pages.forEach((page) => {
            page.questions.forEach((question) => {
                /* Will need to change when we allow people to save and submit later */
                question.value = [];
                question.errorMessage = null;
                question.isValid = true;
				if (data.displayNumbersFlag) 
					question.number = count;
                count++;
            });
		});
		
		console.log("Formatted data ", data);
        return data;
    }

    /**
     *Iterates through each question and runs a validation check
     *
     * @returns {*} - boolean with error state
     * @memberof EZForm
     */
    validateCurrentPage() {
        let state = this.state;
        let page = state.data.pages[state.currentPage];
		const validator = new EZFormValidator();
		
        let validationObject = validator.validatePage(page);
        state.data.pages[state.currentPage] = validationObject.validatedPage;

        let prevState = this.state;

        prevState.data = state.data;
        const formErrorMessage = validator.getErrorMessageForErrors(
            validationObject.errors
        );

        this.setState(prevState);
        return {
            isValid: validationObject.errors.length === 0,
            prompt: formErrorMessage,
        };
    }

    /**
     * Returns full component
     * @returns {*} React element
     * @memberof EZFormBase
     */
    getFullComponent() {
        const currentPage = this.state.data.pages[this.state.currentPage];
        return (
            <>
                <EZFormPage
                    onValueChanged={this.onValueChanged.bind(this)}
                    {...currentPage}
                />
                {this.getBottomElements()}
            </>
        );
    }

    /**
     * Method called when the back button is pressed
     *
     * @memberof EZForm
     */
    onGoBack() {
		const validationResults = this.validateCurrentPage();
        if (validationResults.isValid) {
            let prevState = this.state;
            prevState.currentPage--;
            this.setState(prevState);
        } else {
            //Error
            this.prompt(
                "The following questions are required:",
                validationResults.prompt
            );
        }
    }

    /**
     * Method called when the next button is pressed
     *
     * @memberof EZForm
     */
    onGoForward() {
		const validationResults = this.validateCurrentPage();
        if (validationResults.isValid) {
            let prevState = this.state;
            prevState.currentPage++;
            this.setState(prevState);
        } else {
            //Error
            this.prompt(
                "The following questions are required:",
                validationResults.prompt
            );
        }
        //Bring the screen to the top of the site when the form page is changed
        window.scrollTo(0, 0);
	}
	
	/**
	 * When a component will be submitted
	 *
	 * @memberof EZFormBase
	 */
	onSubmit() {
		const validationResults = this.validateCurrentPage();
		if(validationResults.isValid){
			let parser = new EZFormResponseParser();
			this.props.onSubmit(parser.getResponseDataForEZForm(this.state.data));
		}else{
			this.prompt(
                "The following questions are required:",
                validationResults.prompt
            );
		}
		
	}

    /**
     * Returns the next button element
     *
     * @returns {*} The next button element
     * @memberof EZFormBase
     */
    getNextButton() {
        const isLastPage = this.state.currentPage === this.state.data.pages.length - 1;
        let buttonText = "Next";
        let onClick = this.onGoForward.bind(this);
        if (isLastPage) {
            buttonText = "Submit";
            onClick = this.onSubmit.bind(this);
        }

        return (
            <Button
                color={"primary"}
                variant={"contained"}
                size='small'
                onClick={onClick}>
                {buttonText}
                <KeyboardArrowRight />
            </Button>
        );
    }

    /**
     * Returns the back button element
     *
     * @returns {*} React Element
     * @memberof EZFormBase
     */
    getBackButton() {
        const computedStyle =
            this.state.currentPage === 0 ? { visibility: "hidden" } : {};

        return (
            <Button
                style={computedStyle}
                size='small'
                color={"secondary"}
                variant={"contained"}
                onClick={this.onGoBack.bind(this)}
                disabled={this.state.currentPage === 0}>
                <KeyboardArrowLeft />
                Back
            </Button>
        );
    }

    /**
     * Returns the bottom element for the form
     *
     * @returns {*} React element
     * @memberof EZFormBase
     */
    getBottomElements() {
        return (
            <MobileStepper
                variant='dots'
                steps={this.state.data.pages.length}
                position='static'
                activeStep={this.state.currentPage}
                nextButton={this.getNextButton()}
                backButton={this.getBackButton()}
            />
        );
    }

    /**
     * Renders a base EZForm component
     *
     * @returns {*} React element
     * @memberof EZFormBase
     */
    render() {
        return (
            <>
                {this.getFullComponent()}
                <MessageBox
                    key={this.state.showModal}
                    show={this.state.showModal}
                    message={this.state.modalMessage}
                    title={this.state.modalTitle}
                    onClose={this.onCloseModal.bind(this)}
                />
            </>
        );
    }
}

EZFormBase.propTypes = {
	unformattedFormData: PropTypes.any.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default EZFormBase;
