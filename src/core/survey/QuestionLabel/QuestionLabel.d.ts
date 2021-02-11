export default QuestionLabel;
declare class QuestionLabel {
    constructor(props: any);
    render(): JSX.Element;
}
declare namespace QuestionLabel {
    namespace defaultProps {
        const isRequired: boolean;
    }
    namespace propTypes {
        export const number: any;
        export const label: any;
        export const helperText: any;
        const isRequired_1: any;
        export { isRequired_1 as isRequired };
    }
}
