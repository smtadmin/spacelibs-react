export default Header;
declare class Header {
    constructor(props: any);
    render(): JSX.Element;
}
declare namespace Header {
    namespace defaultProps {
        const bootstrap: string;
    }
    namespace propTypes {
        const left: any;
        const center: any;
        const right: any;
    }
}
