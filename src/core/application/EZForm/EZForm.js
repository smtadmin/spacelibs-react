/*
 * File: EZForm
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: React component that displays a form using the EZForm api
 * File Created: Thursday, 18th February 2021 4:01 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Monday, 22nd February 2021 3:24 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';
import HTTPService from '../../../../spacelibs-js/core/io/BaseHTTPService';
import EZFormPage from './EZFormPage/EZFormPage';

import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const EZFormStatus = Object.freeze({"loading":1, "failedToLoad":2, "inProgress":3, "submitted": 4});
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
            formErrorMessage: null
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
            host: ""
        });

        const token = bearerTokenCallback();
        const options = {headers: [{"Authorization": "Bearer " + token}]};
        http.read("http://localhost:8080/api/ezform/" + formId, {}, this.onSuccess.bind(this), this.onFailure.bind(this), {});
    }

    formatData(data){
        let count = 1;
        data.pages.forEach(page=> {
            page.questions.forEach(question => {
                
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
            formErrorMessage: null
        });
    }

    onFailure(response) {
        console.log("Err:",response);
        this.setState({
            status: EZFormStatus.failedToLoad,
            currentPage: 0,
            pageCount: 0,
            data: null,
            formErrorMessage: null
        });
    }

    onValueChanged(questionId, value){
        console.log(questionId, value);
        let prevState = this.state;
        let breakOut = false;
        for(var x = 0; x < prevState.data.pages.length; x++){
            let page = prevState.data.pages[x];
            for(var y = 0; y < page.questions.length; y++){
                let question = page.questions[y];
                if(question.identifier === questionId){
                    question.value = value;
                    breakOut = true;
                    break;
                }
            }
            if(breakOut) { break; }
        }

        this.setState(prevState);
    }

    



    //Call factory that will take in a question and return a jsx element


    //On user submission validate the inputs


    //Send for data to the back end



    onSubmit(){
        console.log("Submitting nothing");
        if(this.validate()){
            if(this.submitData()){
                console.log("Submission accepted!");
            }else{
                console.log("Submission failed");
            }
        }else{
            console.log("Validation Failed");
        }
    }

    /**
     *Iterates through each question and runs a validation check
     *
     * @returns {*} - boolean with error state
     * @memberof EZForm
     */
    validate(){
        console.log("Validating nothing");
        let stateData = this.state.data;
        let errors = [];
        for(var x = 0; x < stateData.pages.length; x++){
            let page = stateData.pages[x];
            for(var y = 0; y < page.questions.length; y++){
                let question = page.questions[y];
                const validateObject = this.validateQuestion(question);
                if(!validateObject.isValid){
                    errors.push(question.number);
                }

                question.isValid = validateObject.isValid;
                question.errorMessage = validateObject.errorMessage;
            }
        }

        let prevState = this.state;

        prevState.data = stateData;
        prevState.formErrorMessage = "";

        this.setState(prevState);

        return errors.length === 0;   
    }

    /**
     *Validates that the required questions were answered and all of the input values are valid
     *
     * @param {*} question - The question to validate
     * @returns {*} - Object with boolean isValid and an error if the validation returns false
     * @memberof EZForm
     */
    validateQuestion(question){
        // console.log("Validating question",question);
        // question.isRequired = false;
        if(!question.isRequired || (Array.isArray(question.value) && question.value.length > 0)){
            return {
                isValid: true
            };
        }else{
            return {
                isValid: false,
                errorMessage: "This field is required"
            };
        }
    }

    getErrorMessageForErrors(errors){
        if(errors.length === 0){
            return null;
        }
        if(errors.length === 1){
            return "There is a problem with question " + errors[0];
        }else{
            let output = "There are problems with questions ";
            for(var x = 0; x < errors.length; x++){
                if(x === errors.length - 1){
                    output += "and " + errors[x];
                }else{
                    output += errors[x] + ", ";
                }
            }
            return output;
        }
    }

    submitData(){
        console.log("Data was valid, submitting form");

        let http = new HTTPService({
            host: ""
        });

        const token = this.props.bearerTokenCallback();
        const options = {headers: [{"Authorization": "Bearer " + token}]};

        let data = [];

        for(let x = 0; x < this.state.data.pages.length; x++){
            const page = this.state.data.pages[x];
            for(let y = 0; y < page.questions.length; y++){
                const question = page.questions[x];
                let values = this.getResponseValuesFromQuestion(question);
                for(var z = 0; z < values.length; z++){
                    data.push(values[z]);
                }
                
            }
        }
        console.log(data);

        http.insert("http://localhost:8080/api/ezform/response/" + this.state.data.identifier, data, ()=>{
            console.log("Something worked!");
        }, ()=>{
            console.log("Something went wrong");
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    getResponseValuesFromQuestion(question){
        console.log("Question", question);
        let values = question.value;
        let output = [];
        for(let x = 0; x < values.length; x++){
            output.push({
                question: question.identifier,
                value: values[x].displayText
            });
        }
        console.log("Values: ", output);
        return output;
    }

    onGoBack(){
        if(this.state.currentPage > 0){
            let prevState = this.state;
            prevState.currentPage--;
            this.setState(prevState);
        }
    }

    onGoForward(){
        if(this.state.currentPage < this.state.pageCount - 1){
            let prevState = this.state;
            prevState.currentPage++;
            this.setState(prevState);
        }
    }

    /**
     *Renders the returned JSX element
     * @returns {*} JSX element
     * @memberof EZForm
     */
    render() {
        let output = {};
        const isLastPage = this.state.currentPage === this.state.pageCount - 1;
        const backButton = 
            <Button size="small" color={"primary"} variant={"contained"} onClick={this.onGoBack.bind(this)} disabled={this.state.currentPage === 0}>
            <KeyboardArrowLeft />
            Back
            </Button>;
        
        // const bottomElements = <div className={"form-footer"}>{backButton}{forwardButton}{submitButton}</div>;
        let forwardButton;
        if(isLastPage){
            forwardButton = <Button color={"primary"} variant={"contained"} size="small" onClick={this.onSubmit.bind(this)}>
            Submit
            <KeyboardArrowRight />
            </Button>;
        }else{
            forwardButton = <Button color={"primary"} variant={"contained"} size="small" onClick={this.onGoForward.bind(this)}>
            Next
            <KeyboardArrowRight />
            </Button>;
        }
        
        const bottomElements = <MobileStepper
        variant="dots"
        steps={this.state.pageCount}
        position="static"
        activeStep={this.state.currentPage}
        nextButton={forwardButton}
        backButton={backButton}
        />;


        if(this.state.status === EZFormStatus.loading){
            output = <div>Loading...</div>;
        }else if(this.state.status === EZFormStatus.failedToLoad){
            output = <div>404 Couldn't find form {this.props.formId}</div>;
        }else if(this.state.status === EZFormStatus.inProgress){
            const currentPage = this.state.data.pages[this.state.currentPage];
            output = <>
            <EZFormPage onValueChanged={this.onValueChanged.bind(this)} {...currentPage}/>
            {bottomElements}
            </>;
        }else{
            const definedResponse = this.state.data.submissionText;
            const response = definedResponse ? definedResponse : "Thank you for your submission.";
            output = <div className="submission-text">{response}</div>;
        }

        return output;
    }

}

export default EZForm;

