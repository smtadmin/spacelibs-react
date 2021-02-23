/*
 * File: EZForm
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: React component that displays a form using the EZForm api
 * File Created: Thursday, 18th February 2021 4:01 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 23rd February 2021 11:58 am
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from "react";
import PropTypes from "prop-types";
import HTTPService from "../../../../spacelibs-js/core/io/BaseHTTPService";
import EZFormPage from "./EZFormPage/EZFormPage";
import SMTButton from '../../input/Button';

import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import CheckCircle from "@material-ui/icons/CheckCircle";
import MessageBox from "../../notification/MessageBox";
import CircularProgress from "@material-ui/core/CircularProgress";

const EZFormStatus = Object.freeze({
    loading: 1,
    failedToLoad: 2,
    inProgress: 3,
    submitting: 4,
    submitted: 5,
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
            modalMessage: ""
        };
        this.getFormData(props.formId, props.bearerTokenCallback);
        this.formatData = this.formatData.bind(this);
    }

    /**
     *Makes a request to the EZForm api to retrieve form data using the form id
     *
     * @param {*} formId - The id of the form
     * @param {*} bearerTokenCallback - A callback to access the bearerToken
     * @memberof EZForm
     */
    getFormData(formId, bearerTokenCallback) {
        //make request to the api using
        // /ezform/SpOC_JA_tracker
        let http = new HTTPService({
            host: "",
        });

        const token = bearerTokenCallback();
        const options = { headers: [{ Authorization: "Bearer " + token }] };
        http.read(
            "http://localhost:8080/api/ezform/" + formId,
            {},
            this.onSuccess.bind(this),
            this.onFailure.bind(this),
            {}
        );
    }

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

    onSuccess(response) {
        //if successful call formatData
        console.log(response.data);
        const formattedData = this.formatData(response.data);
        this.setState({
            status: EZFormStatus.inProgress,
            currentPage: 0,
            pageCount: formattedData.pages.length,
            data: formattedData,
            formErrorMessage: null,
            showModal: false,
            modalMessage: "",
        });
    }

    onFailure(response) {
        console.log("Err:", response);
        this.setState({
            status: EZFormStatus.failedToLoad,
            currentPage: 0,
            pageCount: 0,
            data: null,
            formErrorMessage: null,
            showModal: false,
            modalMessage: ""
        });
    }

    onValueChanged(questionId, value) {
        console.log(questionId, value);
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

    //Call factory that will take in a question and return a jsx element

    //On user submission validate the inputs

    //Send for data to the back end

    prompt(message) {
        let prevState = this.state;
        prevState.showModal = true;
        prevState.modalMessage = message;
        this.setState(prevState);
    }

    onSubmit() {
        console.log("Submitting nothing");
        const validationResults = this.validateCurrentPage();
        if (validationResults.isValid) {
            let prevState = this.state;
            prevState.status = EZFormStatus.submitting;
            this.setState(prevState);
            this.sendData();
        } else {
            this.prompt(validationResults.prompt);
            console.log("Validation Failed");
        }
    }

    /**
     *Iterates through each question and runs a validation check
     *
     * @returns {*} - boolean with error state
     * @memberof EZForm
     */
    validateCurrentPage() {
        console.log("Validating nothing");
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
            prompt: formErrorMessage
        };
    }

    /**
     *Validates that the required questions were answered and all of the input values are valid
     *
     * @param {*} question - The question to validate
     * @returns {*} - Object with boolean isValid and an error if the validation returns false
     * @memberof EZForm
     */
    validateQuestion(question) {
        // console.log("Validating question",question);
        // question.isRequired = false;
        let valueArray;

        if (Array.isArray(question.value)) {
            valueArray = question.value;
        } else {
            return {
                isValid: false,
                errorMessage: "Internal error",
            };
        }

        const isEmpty = valueArray.length === 0;
        if (question.dataType.code === "date") {
            if (question.isRequired) {
                if (isEmpty) {
                    return {
                        isValid: false,
                        errorMessage: "This field is required",
                    };
                } else if (!(valueArray[0] instanceof Date && !isNaN(valueArray[0]))) {
                    return {
                        isValid: false,
                        errorMessage: "",
                    };
                } else {
                    return {
                        isValid: true
                    };
                }
            } else {
                if (isEmpty || valueArray[0] instanceof Date && !isNaN(valueArray[0])) {
                    return {
                        isValid: true
                    };
                } else {
                    return {
                        isValid: false,
                        errorMessage: "",
                    };
                }
            }
        } else {
            if (!question.isRequired || !isEmpty) {
                return {
                    isValid: true
                };
            } else {
                return {
                    isValid: false,
                    errorMessage: "This field is required"
                };
            }
        }
    }

    getErrorMessageForErrors(errors) {
        if (errors.length === 0) {
            return null;
        }
        if (errors.length === 1) {
            return "There is a problem with question " + errors[0];
        } else {
            let output = "There are problems with questions ";
            for (var x = 0; x < errors.length; x++) {
                if (x === errors.length - 1) {
                    output += "and " + errors[x];
                } else {
                    output += errors[x] + ", ";
                }
            }
            return output;
        }
    }

    sendData() {
        console.log("Data was valid, submitting form");

        let http = new HTTPService({
            host: "",
        });

        const token = this.props.bearerTokenCallback();
        const options = { headers: [{ Authorization: "Bearer " + token }] };

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

        http.insert(
            "http://localhost:8080/api/ezform/response/" +
            this.state.data.identifier,
            data,
            () => {
                console.log("Submission worked!");
                let prevState = this.state;
                prevState.status = EZFormStatus.submitted;
                this.setState(prevState);
            },
            () => {
                this.prompt("Submission failed, please try again.");
                let prevState = this.state;
                prevState.status = EZFormStatus.inProgress;
                this.setState(prevState);
            },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    }

    getResponseValuesFromQuestion(question) {
        let values = question.value;
        let output = [];
        for (let x = 0; x < values.length; x++) {
            if (
                question.dataType.code === "date" ||
                question.dataType.code === "text"
            ) {
                output.push({
                    question: question.identifier,
                    value: values[x],
                });
            } else {
                output.push({
                    question: question.identifier,
                    value: values[x].displayText,
                });
            }
        }
        console.log("Values: ", output);
        return output;
    }

    onGoBack() {
        if (this.state.currentPage > 0) {
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
    }

    onGoForward() {
        if (this.state.currentPage < this.state.pageCount - 1) {
            const validationResults = this.validateCurrentPage();
            if (validationResults.isValid) {
                let prevState = this.state;
                prevState.currentPage++;
                this.setState(prevState);
            } else {
                //Error
                this.prompt(validationResults.prompt);
            }
        }
    }

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
                    color={"primary"}
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
                    color={"primary"}
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
            output = <div>Loading...</div>;
        } else if (this.state.status === EZFormStatus.failedToLoad) {
            output = <div>404 Couldn't find form {this.props.formId}</div>;
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
                <div className="justify-content-center text-center">
                    <h1>Submitting</h1>
                    <CircularProgress color="primary" />
                </div>
            );

        } else {
            const definedResponse = this.state.data.submissionText;
            const response = definedResponse
                ? definedResponse
                : "Thank you for your submission.";
            output = (
                <div className='submission-text text-center'>
                    <span style={{ fontSize: "60px" }}>
                        <CheckCircle fontSize="inherit" htmlColor={"#4fad52"} />
                    </span>
                    <h1>Thanks!</h1>
                    <h1>You're all set</h1>
                    <h2>The form has successfully been submitted.</h2>
                    {this.state.data.resubmitFlag && (
                        <SMTButton
                            className={"resubmit-button"}
                            color={"secondary"}
                            onClick={() => {
                                window.location = "/form/" + this.props.formId;
                            }}>
                            Submit Another Form
                        </SMTButton>
                    )}
                </div>
            );
        }

        console.log("Re rendering: ", this.state);
        return <>
            {output}
            <MessageBox key={this.state.showModal} show={this.state.showModal} message={this.state.modalMessage} title={"EZForm"} onClose={this.onCloseModal.bind(this)} />
        </>;
    }
}

export default EZForm;