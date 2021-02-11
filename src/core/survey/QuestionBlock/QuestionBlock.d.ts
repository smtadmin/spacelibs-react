export default QuestionBlock;
declare class QuestionBlock {
    constructor(props: any);
    render(): any;
}
declare namespace QuestionBlock {
    namespace defaultProps {
        const variant: string;
        const isRequired: boolean;
    }
    namespace propTypes {
        export const value: any;
        export const hasError: any;
        export const subText: any;
        export const identifier: any;
        export const number: any;
        const variant_1: any;
        export { variant_1 as variant };
        export const label: any;
        const isRequired_1: any;
        export { isRequired_1 as isRequired };
        export const helperText: any;
        export const type: any;
        export const placeholder: any;
        export const config: any;
        export const onValueChanged: any;
    }
}
