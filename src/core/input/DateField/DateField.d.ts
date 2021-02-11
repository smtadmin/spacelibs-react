export default DateField;
declare class DateField {
    constructor(props: object);
    onValueChanged(event: any): void;
    render(): object;
}
declare namespace DateField {
    namespace defaultProps {
        const variant: string;
    }
    namespace propTypes {
        export const value: any;
        export const hasError: any;
        export const subText: any;
        const variant_1: any;
        export { variant_1 as variant };
        export const placeholder: any;
        export const format: any;
        export const onValueChanged: any;
    }
}
