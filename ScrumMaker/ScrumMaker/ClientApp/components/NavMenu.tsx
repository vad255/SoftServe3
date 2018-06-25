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
                    <li><a>Grids<span className="arrow-left"></span></a>
                        <ul className="dropdown">
                            <li><Link to="/usergrid">Users</Link></li>
                            <li><Link to="/Stories">Stories</Link></li>
                            <li><Link to="/feature">Features</Link></li>
                            <li><Link to="/sprints">Sprints</Link></li>
                            <li><Link to="/teamgrid">Team</Link></li>
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