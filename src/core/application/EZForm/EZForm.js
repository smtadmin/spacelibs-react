/*
 * File: EZForm
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: React component that displays a form using the EZForm api
 * File Created: Thursday, 18th February 2021 4:01 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th March 2021 12:02 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from "react";
import PropTypes from "prop-types";
import HTTPService from "@siliconmtn/spacelibs-js/core/io/BaseHTTPService";
import EZFormPage from "./EZFormPage/EZFormPage";
import SMTButton from "../../input/Button";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import CheckCircle from "@material-ui/icons/CheckCircle";
import MessageBox from "../../notification/MessageBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import { APIContext } from "../../api";
import moment from 'moment';

const EZFormStatus = Object.freeze({
    loading: "loading",
    failedToLoad: "failedToLoad",
    inProgress: "inProgress",
    submitting: "submitting",
    submitted: "submitted",
});

/**
 * React component that displays a form using the EZForm api
 */
class EZForm extends React.Component {
    /**
     * Creates an instance of the EZForm class
     * @param {*} props - The props passed to the component
     */
    constructor(props) {
        super(props);

        this.state = {
            status: EZFormStatus.loading,
            currentPage: 0,
            pageCount: 0,
            formErrorMessage: null,
            showModal: false,
            modalMessage: "",
            apiService: null,
        };
        this.formatData = this.formatData.bind(this);
    }

    /**
     * Lifecycle method that gets called when the component mounts
     *
     * @memberof EZForm
     */
    componentDidMount() {
        this.getFormData(this.props.formId);
    }

    /**
     * Method to get an HTTPService
     *
     * @returns {*} an HTTPServiceObject
     * @memberof EZForm
     */
    getHTTPService() {
        if (this.context) {
            return new HTTPService({
                host: this.context.baseURL,
            });
        } else {
            return new HTTPService({
                host: "http://something",
            });
        }
    }

    /**
     *Makes a request to the EZForm api to retrieve form data using the form id
     *
     * @param {*} formId - The id of the form
     * @memberof EZForm
     */
    getFormData(formId) {
        let http = this.getHTTPService();
        let prevState = this.state;
        prevState.apiService = http;
        this.setState(prevState);
        http.read("/api/ezform/" + formId, {}, this.onComplete.bind(this), {});
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

                question.number = count;
                count++;
            });
        });
        return data;
    }

    /**
     * This method is called when API request to get data is complete
     *
     * @param {*} response The response object from the APIService
     * @memberof EZForm
     */
    onComplete(response) {
        let data;
        let pageCount = 0;
        let status = EZFormStatus.failedToLoad;

        if (response.isValid) {
            data = this.formatData(response.data);
            pageCount = data.pages.length;
            status = EZFormStatus.inProgress;
        }

        this.setState({
            status: status,
            currentPage: 0,
            pageCount: pageCount,
            data: data,
            formErrorMessage: null,
            showModal: false,
            modalMessage: "",
        });

        this.props.stateCallback?.(status);
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
     * Prompts a modal to pop up
     *
     * @param {*} message message to add to the modal
     * @memberof EZForm
     */
    prompt(message) {
        let prevState = this.state;
        prevState.showModal = true;
        prevState.modalMessage = message;
        this.setState(prevState);
    }

    /**
     * Method called when the submit button is pressed
     *
     * @memberof EZForm
     */
    onSubmit() {
        const validationResults = this.validateCurrentPage();
        if (validationResults.isValid) {
            let prevState = this.state;
            prevState.status = EZFormStatus.submitting;
            this.props.stateCallback?.(EZFormStatus.submitting);
            this.setState(prevState);
            this.sendData();
        } else {
            this.prompt(validationResults.prompt);
        }
    }

    /**
     *Iterates through each question and runs a validation check
     *
     * @returns {*} - boolean with error state
     * @memberof EZForm
     */
    validateCurrentPage() {
        let state = this.state;
        let errors = [];
        let page = state.data.pages[state.currentPage];
        for (var y = 0; y < page.questions.length; y++) {
            let question = page.questions[y];

            const validateObject = this.validateQuestion(question);
            if (!validateObject.isValid) {
                errors.push(question.number);
            }

            question.isValid = validateObject.isValid;
            question.errorMessage = validateObject.errorMessage;
        }

        let prevState = this.state;

        prevState.data = state.data;
        const formErrorMessage = this.getErrorMessageForErrors(errors);

        this.setState(prevState);

        return {
            isValid: errors.length === 0,
            prompt: formErrorMessage,
        };
    }

    /**
     * Method to get an aggregated list of errors
     *
     * @param {*} errors error-ing questions
     * @returns {*} String message for errors
     * @memberof EZForm
     */
    getErrorMessageForErrors(errors) {
        if (errors.length === 0) {
            return null;
        }
        if (errors.length === 1) {
            return errors[0];
        } else {
            let output = "";
            for (var x = 0; x < errors.length; x++) {
                output += errors[x] + ", ";
            }
            return output.slice(0, -2);
        }
    }

    /**
     * Method called after submission and validation is done successfully
     *
     * @memberof EZForm
     */
    sendData() {
        let data = [];

        for (let x = 0; x < this.state.data.pages.length; x++) {
            const page = this.state.data.pages[x];
            for (let y = 0; y < page.questions.length; y++) {
                const question = page.questions[y];
                let values = this.getResponseValuesFromQuestion(question);
                for (var z = 0; z < values.length; z++) {
                    data.push(values[z]);
                }
            }
        }
        this.state.apiService.insert(
            "/api/ezform/response/" + this.state.data.identifier,
            data,
            {},
            (response) => {
                let prevState = this.state;
                prevState.status = response.isValid
                    ? EZFormStatus.submitted
                    : EZFormStatus.inProgress;
                this.props.stateCallback?.(prevState.status);
                this.setState(prevState);
            },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    }

    /**
     * Gets the current value(s) for a question to send as a response to the backend
     *
     * @param {*} question Question object
     * @returns {*} Array of values
     * @memberof EZForm
     */
    getResponseValuesFromQuestion(question) {
        const dictionary = {
            ENTRY: this.getEntryValue.bind(this),
            MULTI: this.getMultiValue.bind(this),
            CHOICE: this.getChoiceValue.bind(this),
        };

        return dictionary[question.type](question);
    }

    /**
     * Gets value for an Entry question
     *
     * @param {*} question Question object
     * @returns {Array.<{isValid: boolean, errorMessage: string}>} Value object
     * @memberof EZForm
     */
    getEntryValue(question) {
        if (question.value == null || question.value.length === 0) {
            return [];
        }

        return [
            {
                question: question.identifier,
                value: question.value[0],
            },
        ];
    }

    /**
     * Gets value for a Multi question
     *
     * @param {*} question Question object
     * @returns {Array.<{isValid: boolean, errorMessage: string}>} Value object
     * @memberof EZForm
     */
    getMultiValue(question) {
        let values = [];
        for (let x = 0; x < question.value.length; x++) {
            const value =
                question.altResponseId === question.value[x].identifier
                    ? question.value[x].value
                    : question.value[x].displayText;
            values.push({
                question: question.identifier,
                value: value,
            });
        }
        return values;
    }

    /**
     * Gets value for a Choice question
     *
     * @param {*} question Question object
     * @returns {Array.<{isValid: boolean, errorMessage: string}>} Value object
     * @memberof EZForm
     */
    getChoiceValue(question) {
        if (question.value == null || question.value.length === 0) return [];

        return [
            {
                question: question.identifier,
                value: question.value[0].displayText,
            },
        ];
    }

    /**
     *Validates that the required questions were answered and all of the input values are valid
     *
     * @param {*} question - The question to validate
     * @returns {*} - Object with boolean isValid and an error if the validation returns false
     * @memberof EZForm
     */
    validateQuestion(question) {
        const dictionary = {
            ENTRY: this.validateEntry.bind(this),
            MULTI: this.validateMulti.bind(this),
            CHOICE: this.validateChoice.bind(this),
        };
        const validationFunc = dictionary[question.type];
        const validationObject = validationFunc(question);
        return validationObject;
    }

    /**
     * Factory for single value validation against its type
     *
     * @param {*} value value to be validated
     * @param {*} type type the value should be
     * @param {*} isRequired whether or not the value is required
     * @returns {*} validation object
     * @memberof EZForm
     */
    validateValueAgainstType(value, type, isRequired) {
        const dictionary = {
            DATE: this.validateDate.bind(this),
            TEXT: this.validateText.bind(this),
            NUMBER: this.validateNumber.bind(this),
        };
        return dictionary[type](value, isRequired);
    }

    /**
     * Validates the value object as a date
     *
     * @param {*} value Object to validate
     * @param {*} isRequired Whether or not the date is required
     * @returns {*} Validation object
     * @memberof EZForm
     */
    validateDate(value, isRequired) {
        const validDate = value && moment(value, "MM/DD/YYYY").isValid();

        if (isRequired) {
            if (validDate) {
                return { isValid: true, errorMessage: "" };
            } else if (!value || value.length === 0) {
                return {
                    isValid: false,
                    errorMessage: "This field is required",
                };
            } else {
                return { isValid: false, errorMessage: "" };
            }
        } else {
            if (validDate || value == null || value.length === 0) {
                return { isValid: true, errorMessage: "" };
            } else {
                return { isValid: false, errorMessage: "" };
            }
        }
    }

    /**
     * Validates a value object as text
     *
     * @param {*} value Object to validate
     * @param {*} isRequired Whether or not the value needs to exist
     * @returns {*} Validation object
     * @memberof EZForm
     */
    validateText(value, isRequired) {
        const hasValue = value != null && value.length > 0;

        if (isRequired) {
            if (hasValue) {
                return { isValid: true, errorMessage: "" };
            } else {
                return {
                    isValid: false,
                    errorMessage: "This field is required",
                };
            }
        } else {
            return { isValid: true, errorMessage: "" };
        }
    }

    /**
     * Validates a value object as a number
     *
     * @param {*} value Object to validate
     * @param {*} isRequired Whether or not the value needs to exist
     * @returns {*} Validation object
     * @memberof EZForm
     */
    validateNumber(value, isRequired) {
        const validNumber = value && !isNaN(value);
        if (isRequired) {
            if (validNumber && value.length > 0) {
                return { isValid: true, errorMessage: "" };
            } else if (value && value.length > 0) {
                return {
                    isValid: false,
                    errorMessage: "This field expects a number",
                };
            } else {
                return {
                    isValid: false,
                    errorMessage: "This field is required",
                };
            }
        } else {
            if (validNumber || value == null || value.length === 0) {
                return { isValid: true, errorMessage: "" };
            } else {
                return {
                    isValid: false,
                    errorMessage: "This field expects a number",
                };
            }
        }
    }

    /**
     * Validates an entry question
     *
     * @param {*} question Question to validate
     * @returns {*} boolean, true the value is a valid representation of the type
     * @memberof EZForm
     */
    validateEntry(question) {
        const hasValues = question.value != null && question.value.length;
        return this.validateValueAgainstType(
            hasValues ? question.value[0] : null,
            question.dataType.code,
            question.isRequired
        );
    }

    /**
     * Validate a multiple choice question
     *
     * @param {*} question Question to validate
     * @returns {*} boolean, true the value is a valid representation of the type
     * @memberof EZForm
     */
    validateMulti(question) {
        let values = question.value;
        let altId = question.altResponseId;

        for (let index = 0; index < values.length; index++) {
            const option = values[index];
            const value =
                option.identifier === altId ? option.value : option.displayText;

            let error = this.validateValueAgainstType(
                value,
                question.dataType.code,
                question.isRequired
            );
            if (!error.isValid) {
                return error;
            }
        }

        if (question.isRequired && values.length === 0) {
            return {
                isValid: false,
                errorMessage: "This field is required",
            };
        }

        return { isValid: true, errorMessage: "" };
    }

    /**
     * Validates a choice question
     *
     * @param {*} question Question to validate
     * @returns {*} boolean, true the value is a valid representation of the type
     * @memberof EZForm
     */
    validateChoice(question) {
        const hasValues = question.value != null && question.value.length > 0;
        return this.validateValueAgainstType(
            hasValues ? question.value[0].displayText : null,
            question.dataType.code,
            question.isRequired
        );
    }

    // /**
    //  * Validate a choice question
    //  *
    //  * @param {*} question question to validate
    //  * @returns {*} boolean, true the value is a valid representation of the type
    //  * @memberof EZForm
    //  */
    // validateChoice(question) {
    //     const hasValues = question.values != null && question.values.length > 0;
    //     return this.validateValueAgainstType(
    //         hasValues ? question.values[0] : null,
    //         question.dataType.code,
    //         null,
    //         question.isRequired
    //     );
    // }

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
            this.prompt(validationResults.prompt);
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
            this.prompt(validationResults.prompt);
        }
        //Bring the screen to the top of the site when the form page is changed
        window.scrollTo(0, 0);
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
     *Renders the returned JSX element
     * @returns {*} JSX element
     * @memberof EZForm
     */
    render() {
        let output = {};
        const isLastPage = this.state.currentPage === this.state.pageCount - 1;
        let backButton;
        if (this.state.currentPage === 0) {
            backButton = (
                <Button
                    style={{ visibility: "hidden" }}
                    size='small'
                    color={"secondary"}
                    variant={"contained"}
                    onClick={this.onGoBack.bind(this)}
                    disabled={this.state.currentPage === 0}>
                    <KeyboardArrowLeft />
                    Back
                </Button>
            );
        } else {
            backButton = (
                <Button
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

        // const bottomElements = <div className={"form-footer"}>{backButton}{forwardButton}{submitButton}</div>;
        let forwardButton;
        if (isLastPage) {
            forwardButton = (
                <Button
                    color={"primary"}
                    variant={"contained"}
                    size='small'
                    onClick={this.onSubmit.bind(this)}>
                    Submit
                    <KeyboardArrowRight />
                </Button>
            );
        } else {
            forwardButton = (
                <Button
                    color={"primary"}
                    variant={"contained"}
                    size='small'
                    onClick={this.onGoForward.bind(this)}>
                    Next
                    <KeyboardArrowRight />
                </Button>
            );
        }

        const bottomElements = (
            <MobileStepper
                variant='dots'
                steps={this.state.pageCount}
                position='static'
                activeStep={this.state.currentPage}
                nextButton={forwardButton}
                backButton={backButton}
            />
        );

        if (this.state.status === EZFormStatus.loading) {
            output = (
                <div className='justify-content-center text-center'>
                    <CircularProgress color='primary' />
                </div>
            );
        } else if (this.state.status === EZFormStatus.failedToLoad) {
            output = <div>404 Couldn&apos;t find form {this.props.formId}</div>;
        } else if (this.state.status === EZFormStatus.inProgress) {
            const currentPage = this.state.data.pages[this.state.currentPage];
            output = (
                <>
                    <EZFormPage
                        onValueChanged={this.onValueChanged.bind(this)}
                        {...currentPage}
                    />
                    {bottomElements}
                </>
            );
        } else if (this.state.status === EZFormStatus.submitting) {
            output = (
                <div className='justify-content-center text-center'>
                    <h1>Submitting</h1>
                    <CircularProgress color='primary' />
                </div>
            );
        } else {
            output = (
                <div className='submission-text text-center'>
                    <span style={{ fontSize: "60px" }}>
                        <CheckCircle fontSize='inherit' htmlColor={"#4fad52"} />
                    </span>
                    <h1>Thanks!</h1>
                    <h1>You&apos;re all set.</h1>
                    <h3>The form has successfully been submitted.</h3>
                    {this.state.data.resubmitFlag && (
                        <SMTButton
                            className={"resubmit-button"}
                            color={"secondary"}
                            onClick={() => {
                                window.location = "/form/" + this.props.formId;
                            }}>
                            Submit Another Response
                        </SMTButton>
                    )}
                </div>
            );
        }

        return (
            <>
                {output}
                {/* Missing required questions modal */}
                <MessageBox
                    key={this.state.showModal}
                    show={this.state.showModal}
                    message={this.state.modalMessage}
                    title='The following questions are required:'
                    onClose={this.onCloseModal.bind(this)}
                />
            </>
        );
    }
}

EZForm.propTypes = {
    formId: PropTypes.string,
    stateCallback: PropTypes.func
};

EZForm.contextType = APIContext;

export default EZForm;
