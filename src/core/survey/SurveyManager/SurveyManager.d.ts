export default SurveyManager;
declare class SurveyManager {
    constructor(props: any);
    state: {
        questions: ({
            number: number;
            identifier: string;
            type: string;
            label: string;
            isRequired: boolean;
            config: {
                isMultiple?: undefined;
                options?: undefined;
            };
            format?: undefined;
        } | {
            number: number;
            identifier: string;
            type: string;
            label: string;
            isRequired: boolean;
            config: {
                isMultiple: boolean;
                options: {
                    identifier: string;
                    displayText: string;
                }[];
            };
            format?: undefined;
        } | {
            number: number;
            identifier: string;
            type: string;
            format: string;
            label: string;
            isRequired: boolean;
            config: {
                isMultiple?: undefined;
                options?: undefined;
            };
        })[];
    };
    onValueChanged(questionId: any, value: any): void;
    validate(question: any): {
        hasError: boolean;
        errorMessage: string;
    };
    onSubmit(): void;
    render(): JSX.Element;
    getTestQuestions(): ({
        number: number;
        identifier: string;
        type: string;
        label: string;
        isRequired: boolean;
        config: {
            isMultiple?: undefined;
            options?: undefined;
        };
        format?: undefined;
    } | {
        number: number;
        identifier: string;
        type: string;
        label: string;
        isRequired: boolean;
        config: {
            isMultiple: boolean;
            options: {
                identifier: string;
                displayText: string;
            }[];
        };
        format?: undefined;
    } | {
        number: number;
        identifier: string;
        type: string;
        format: string;
        label: string;
        isRequired: boolean;
        config: {
            isMultiple?: undefined;
            options?: undefined;
        };
    })[];
}
