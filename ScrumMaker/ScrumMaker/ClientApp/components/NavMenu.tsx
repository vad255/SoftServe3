﻿import * as React from 'react';
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
                        <ul className='dropdown nav navbar-nav'>
                            <li>
                                <NavLink to={'/sprints'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list'></span> Sprints
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/usergrid'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list'></span> Users
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/Stories'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list'></span> Stories
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/feature'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list'></span> Features
                            </NavLink>
                            </li>
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