import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ButtonToolbar, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import { RegistrationButton } from './ForAdmin/RegistrationButton'
import { Role } from './Models/Role';
import { User } from './Models/User';
import { RouteComponentProps } from 'react-router';

export class NavMenu extends React.Component<{}, { role: string }> {
    constructor(props: any) {
        super(props);
        this.state = (({
            role: ""
        }) as any);
        this.loadUser();

    }
    loadUser() {
        fetch('/getrole', { credentials: 'include' })
            .then(responce => responce.text() as Promise<any>)
            .then(data => {
                let temp = data;
                console.log(data);
                this.setState({ role: temp });
            })
    }
    public render() {
        var register;
        if (this.state.role == "\"Admin\"")
            register = <RegistrationButton />;

        return <nav>
            <div id='myUl' className="navigation fontFamily siteColor">
                <ul>
                    <li><a href="/">Home</a></li><br />
                    {register}
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
                    <br />
                    <li><a>Meetings<span className="arrow-left"></span></a>
                        <ul className='dropdown nav navbar-nav'>
                            <li>
                                <NavLink to={'/SprintPlaning'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list columnGrid'></span> SprintPlaning
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/SelectSprint'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list columnGrid'></span> Sprint review
                                    </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/SelectSprintPage'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list fa-columns'></span> Retrospective meeting
                                 </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to={'/SimpleChat'} id='coulumWidth' activeClassName='active'>
                            Chat
                            </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/Calendar'} id='coulumWidth' activeClassName='active'>
                            Calendar
                            </NavLink>
                    </li>
                    <br />
                    <li>
                        <NavLink to={'/Chart'} activeClassName='active'>
                            <span></span> Chart
                            </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/GetError'} activeClassName='active'>
                            <span></span> Error Page
                        </NavLink>

                    <br />
                    <li>
                        <NavLink to={'/backlog'} activeClassName='active'>
                            <span></span> Backlog
                            </NavLink>

                    </li>
                </ul>
            </div>
            <div className="nav_bg">
                <div className="nav_bar"> <span></span> <span></span> <span></span> </div>
            </div>
        </nav>;
    }
}
