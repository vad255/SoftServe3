import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ButtonToolbar, DropdownButton, MenuItem, Button } from 'react-bootstrap';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <nav>
            <div id='myUl' className="navigation fontFamily siteColor">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/adduser">Registration</a></li>
                    <li><a>Grids<span className="arrow-left"></span></a>
                        <ul className='dropdown nav navbar-nav'>
                            <li>
                                <NavLink to={'/sprints'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list columnGrid'></span> Sprints
                            </NavLink>
                            </li>
                            <li>
                                <Link to='/usergrid'>
                                    <span className='glyphicon glyphicon-th-list columnGrid'></span> Users
                            </Link>
                            </li>
                            <li>
                                <NavLink to={'/Stories'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list columnGrid'></span> Stories
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/feature'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list columnGrid'></span> Features
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/teamgrid'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list columnGrid'></span> Teams
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/defects'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list columnGrid'></span> Defects
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/tasks'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list columnGrid'></span> Tasks
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