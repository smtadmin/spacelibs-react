export default MenuFactory;
declare class MenuFactory {
    constructor(props: any);
    props: any;
    buildNavLinks(): void;
    menuElements: any[];
    content: JSX.Element;
    render(): JSX.Element;
}
declare namespace MenuFactory {
    namespace defaultProps {
        const text: boolean;
        const icon: boolean;
        const dropdown: boolean;
    }
    namespace propTypes {
        export const test: any;
        const icon_1: any;
        export { icon_1 as icon };
        export const name: any;
        const dropdown_1: any;
        export { dropdown_1 as dropdown };
    }
}
