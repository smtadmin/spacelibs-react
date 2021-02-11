export default SelectField;
declare class SelectField {
    constructor(props: object);
    onValueChanged(_event: any, selectedValues: any): void;
    isOptionSelected(option: any, selected: any): boolean;
    isOptionDisabled(option: object): boolean;
    getOptionLabel(option: any): any;
    renderInput(params: any): object;
    renderOption(option: object, inputValue: string): object;
    render(): object;
}
declare namespace SelectField {
    namespace defaultProps {
        const variant: string;
        const isMultiple: boolean;
        const maxCount: number;
    }
    namespace propTypes {
        export const value: any;
        export const hasError: any;
        export const subText: any;
        const variant_1: any;
        export { variant_1 as variant };
        export const inputLabel: any;
        export const placeholder: any;
        export const onValueChanged: any;
        export const config: any;
    }
}
