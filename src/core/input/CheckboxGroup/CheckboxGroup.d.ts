export default CheckboxGroup;
declare class CheckboxGroup {
    constructor(props: object);
    state: {
        values: any[];
    };
    onValueChanged(identifier: object): void;
    render(): object;
}
declare namespace CheckboxGroup {
    namespace defaultProps {
        const color: string;
        const alignment: string;
        const labelPlacement: string;
    }
    namespace propTypes {
        export const value: any;
        export const hasError: any;
        export const subText: any;
        const alignment_1: any;
        export { alignment_1 as alignment };
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
