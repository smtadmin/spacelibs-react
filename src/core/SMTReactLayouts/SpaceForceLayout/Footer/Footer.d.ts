export default Footer;
declare class Footer {
    constructor(props: any);
    render(): JSX.Element;
}
declare namespace Footer {
    namespace defaultProps {
        const bootstrap: string;
    }
    namespace propTypes {
        const left: any;
        const center: any;
        const right: any;
    }
}
