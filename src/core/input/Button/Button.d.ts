export default Button;
declare class Button {
    constructor(props: any);
    render(): object;
}
declare namespace Button {
    namespace defaultProps {
        const varaint: string;
        const color: string;
    }
    namespace propTypes {
        export const children: any;
        export const variant: any;
        const color_1: any;
        export { color_1 as color };
        export const onClick: any;
    }
}
