export default RadioGroup;
declare class RadioGroup {
    constructor(props: object);
    onValueChanged(event: Event): void;
    getFormControlLabel(option: object): object;
    getFormControlList(): object;
    render(): object;
}
declare namespace RadioGroup {
    namespace defaultProps {
        const color: string;
        const alignment: string;
        const labelPlacement: string;
    }
    namespace propTypes {
        export const value: any;
        export const hasError: any;
        export const subText: any;
        const color_1: any;
        export { color_1 as color };
        const labelPlacement_1: any;
        export { labelPlacement_1 as labelPlacement };
        export const variant: any;
        export const onValueChanged: any;
        export const config: any;
    }
}
