/*
 * File: BrowserRouter
 * Version: 0.0.1
 * Project: @siliconmtn/spacelibs-react
 * Description: Wrapper for the React Browser Router. Dynamically builds routes based on the metadata of a SMTRoute and User roles
 * File Created: Monday, 15th February 2021 11:04 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th March 2021 4:48 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as ReactBrowserRouter, Route, Switch } from "react-router-dom";
import { Prompt } from "react-router";

/**
 * Wrapper for the react-router-dom BrowserRouter
 */
class BrowserRouter extends React.Component {

    /**
     * Creates an instance of the BrowserRouter Component
     * @param {*} props Component props
     */
    constructor(props) {
        super(props);
        //Set the userRoles in state so that it will rerender the routes if that value changes
        this.state = {
            userRoles: Array.isArray(props.userRoles) ? props.userRoles : [props.userRoles],
            routes: [].concat(props.routes.pages),
            validRoutes: [],
            errorRoute: null
        };
        this.buildRoutes = this.buildRoutes.bind(this);
    }

    /**
     * When the component is mounted build the routes.
     */
    componentDidMount() {
        this.buildRoutes();
    }

    /**
     * Build all of the routes based on the userRoles and the roles on each of the routes
     */
    buildRoutes() {

        let newValidRoutes = [];
        let errorRoute;

        this.state.routes.forEach(route => {
            if (Array.isArray(route.roles) && (route.roles.includes("*") || route.roles.some(r => this.state.userRoles.includes(r)))) {
                newValidRoutes.push(<Route exact key={route.path} path={route.path}>{route.src}</Route>);
            }
        });

        if (this.props.routes.error) {
            errorRoute = <Route>{this.props.routes.error.src}</Route>;
        }

        let oldState = this.state;
        oldState.validRoutes = newValidRoutes;
        oldState.errorRoute = errorRoute;
        this.setState(oldState);
    }

    /**
     * Render out all of the applicable routes wrapped in a React Browser Router
     */
    render() {
        return (
            <ReactBrowserRouter>
                <Switch>
                    {this.state.validRoutes}
                    {this.state.errorRoute &&
                        this.state.errorRoute
                    }
                </Switch>
            </ReactBrowserRouter>
        );
    }
}

export default BrowserRouter;


/** Prop Validators */
BrowserRouter.propTypes = {
    userRoles: PropTypes.arrayOf(PropTypes.string),
    routes: PropTypes.object
};