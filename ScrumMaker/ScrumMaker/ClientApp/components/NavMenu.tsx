import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse navbar-brand'>
                <div className='navbar-header navbar-left'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>ScrumMaker</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/fetchdata' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/sprints'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Sprints
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/adduser'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Registration New User
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
                </div>
            </div>
        </div>;
    }
}
