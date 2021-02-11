export default SpaceForceLayout;
declare class SpaceForceLayout {
    constructor(props: any);
    header: {
        bootstrap: {
            mobile: string;
            desktop: string;
        };
        left: {
            mobile: {
                content: any;
                bootstrap: any;
            };
            desktop: {
                content: any;
                bootstrap: any;
            };
        };
        center: {
            mobile: {
                content: any;
                bootstrap: any;
            };
            desktop: {
                content: any;
                bootstrap: string;
            };
        };
        right: {
            mobile: {
                content: any;
                bootstrap: any;
            };
            desktop: {
                content: any;
                bootstrap: any;
            };
        };
    };
    footer: {
        bootstrap: {
            mobile: string;
            desktop: string;
        };
        left: {
            mobile: {
                content: any;
                bootstrap: any;
            };
            desktop: {
                content: any;
                bootstrap: any;
            };
        };
        center: {
            mobile: {
                content: any;
                bootstrap: any;
            };
            desktop: {
                content: any;
                bootstrap: any;
            };
        };
        right: {
            mobile: {
                content: any;
                bootstrap: any;
            };
            desktop: {
                content: any;
                bootstrap: any;
            };
        };
    };
    render(): JSX.Element;
}
declare namespace SpaceForceLayout {
    namespace propTypes {
        const ThemeConfig: any;
    }
}
