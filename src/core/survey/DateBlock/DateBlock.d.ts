export default DateBlock;
declare class DateBlock {
    constructor(props: any);
    onValueChanged(output: object): void;
    render(): JSX.Element;
}
declare namespace DateBlock {
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
        const isRequired_1: any;
        export { isRequired_1 as isRequired };
    }
}
