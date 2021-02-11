export default TwoColumn;
declare class TwoColumn {
    constructor(props: any);
    colOneBootstrap: any;
    colTwoBootstrap: any;
    state: {
        colOne: JSX.Element;
        colTwo: JSX.Element;
    };
    addKeys(col: any, columnContent: any): JSX.Element;
    render(): JSX.Element;
}
