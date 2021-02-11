export default BootstrapWrapper;
declare class BootstrapWrapper {
    constructor(props: any);
    props: any;
    buildSections(): void;
    content: JSX.Element[];
    render(): JSX.Element[];
}
declare namespace BootstrapWrapper {
    namespace defaultProps {
        const bootstrap: string;
    }
    namespace propTypes {
        export const content: any;
        export const sectionName: any;
        const bootstrap_1: any;
        export { bootstrap_1 as bootstrap };
    }
}
