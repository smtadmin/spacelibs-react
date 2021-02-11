export default TextBlock;
declare class TextBlock {
    constructor(props: any);
    state: {
        isValid: boolean;
        errorMessage: string;
        value: any;
    };
    onValueChanged(value: object): void;
    render(): any;
}
declare namespace TextBlock {
    namespace defaultProps {
        const variant: string;
        const isRequired: boolean;
    }
    namespace propTypes {
        export const value: any;
        export const hasError: any;
        export const subText: any;
        export const identifier: any;
        const variant_1: any;
        export { variant_1 as variant };
        export const number: any;
        export const label: any;
        export const onValueChanged: any;
        export const placeholder: any;
        export const helperText: any;
        export const config: any;
        const isRequired_1: any;
        export { isRequired_1 as isRequired };
    }
}
