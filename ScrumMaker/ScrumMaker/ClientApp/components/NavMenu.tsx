import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ButtonToolbar, DropdownButton, MenuItem, Button } from 'react-bootstrap';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <nav>
            <div id='myUl' className="navigation">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/adduser">Registration New User</a></li>
                    <li><a href="/fetchdata">Fetch data</a></li>
                    <li><a href="/counter">Counter</a></li>
                    <li><a>Grids<span className="arrow-left"></span></a>
                        <ul className="dropdown">
                            <li><a href="/usergrid">Users</a></li>
                            <li><a href="/Stories">Stories</a></li>
                            <li><a href="/feature">Features</a></li>
                            <li><a href="/sprints">Sprints</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="nav_bg">
                <div className="nav_bar"> <span></span> <span></span> <span></span> </div>
            </div>
        </nav>;
    }
}