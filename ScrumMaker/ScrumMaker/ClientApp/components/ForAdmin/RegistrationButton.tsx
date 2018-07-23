import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ButtonToolbar, DropdownButton, MenuItem, Button } from 'react-bootstrap';

export class RegistrationButton extends React.Component<{}, {}> {
    public render() {
        return <li>
            <NavLink to={'/adduser'} activeClassName='active'>
               Registration
            </NavLink>
        </li>
    }
}
