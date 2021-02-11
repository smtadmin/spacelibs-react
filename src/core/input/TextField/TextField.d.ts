export default TextField;
declare class TextField {
    constructor(props: any);
    onValueChanged(event: any): void;
    render(): object;
}
declare namespace TextField {
    namespace defaultProps {
        const variant: string;
    }
    namespace propTypes {
        export const label: any;
        export const type: any;
        export const onValueChanged: any;
        export const value: any;
        export const hasError: any;
        export const subText: any;
        const variant_1: any;
        export { variant_1 as variant };
    }
}
