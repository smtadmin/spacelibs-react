export default ChoiceBlock;
declare class ChoiceBlock {
    constructor(props: object);
    state: {
        selectedValues: any[];
    };
    valueChanged(output: object): void;
    getFirstSelectedValue(): object;
    render(): object;
}
declare namespace ChoiceBlock {
    namespace defaultProps {
        const color: string;
        const alignment: string;
        const labelPlacement: string;
    }
    namespace propTypes {
        export const value: any;
        export const hasError: any;
        export const subText: any;
        export const identifier: any;
        export const number: any;
        export const label: any;
        export const helperText: any;
        export const isRequired: any;
        const color_1: any;
        export { color_1 as color };
        const labelPlacement_1: any;
        export { labelPlacement_1 as labelPlacement };
        export const variant: any;
        export const inputLabel: any;
        export const placeholder: any;
        export const onValueChanged: any;
        export const hideSelectedValueInInput: any;
        export const config: any;
    }
}
