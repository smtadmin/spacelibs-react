/*
 * File: MenuFactory
 * Version: 0.1.0
 * Project: react-test
 * Description: Takes a route data object and builds out a menu element based on the set parameters
 * By default returns both the icon and the link name but can be overridden by setting the icon or the text props to false
 * A name props should be added to increase the specificity of the generated class tags
 * File Created: Friday, 5th February 2021 10:31 am
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th February 2021 3:02 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Takes a route data object and builds out a menu element
 */
class MenuFactory extends React.Component {

    /**
     * Creates an instance of the MenuFactory Class
     * @param {*} props 
     */
    constructor(props) {
        super();
        this.props = props;
        this.buildNavLinks(props.routeData);
    }

    /**
     * Builds a list of Nav.Link elements using the array of objects passed by the routeData param
     * @param {*} routeData 
     */
    buildNavLinks(routeData) {

        this.menuElements = [];
        let count = 0;
        routeData.forEach(route => {
            let element = [];
            if (this.props.icon === true) {
                element.push(<div key={"icon-" + count} className={"px-1 nav-icon nav-element-icon-" + count} >{route.icon}</div>);
            }
            if (this.props.text === true) {
                element.push(<div key={"text-" + count} className={"px-1 nav-text nav-element-text-" + count} >{route.text}</div>);
            }
            if (this.props.dropdown) {
                this.menuElements.push(<NavDropdown.Item key={this.props.name + count} className={this.props.name + "-nav-element-" + count + " d-flex"} href={route.link}>{element}</NavDropdown.Item>)
                this.content = <NavDropdown title={this.props.name} className={this.props.name}>{this.menuElements}</NavDropdown>;
            } else {
                this.menuElements.push(<Nav.Link key={this.props.name + count} className={this.props.name + "-nav-element-" + count + " d-flex"} href={route.link}>{element}</Nav.Link>)
                this.content = <Nav title="nav-menu" className={this.props.name}>{this.menuElements}</Nav>;
            }
            count++;
        });

    }

    /**
     * Returns a menu component
     */
    render() {
        return this.content;
    }

}

/** Sets Default Props */
MenuFactory.defaultProps = {
    text: true,
    icon: true,
    dropdown: false
};
/** Prop Validators */
MenuFactory.propTypes = {
    test: PropTypes.bool,
    icon: PropTypes.bool,
    name: PropTypes.string.isRequired,
    dropdown: PropTypes.bool
};

export default MenuFactory;