import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Link } from 'react-router-dom';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='header'>
                <img src="./img/ScrumMakerLogo.jpg" width="45" height="45" className="myLogo"/>
                <div id='mySettings'>
                    <div className="navigation">
                        <ul id="rigthUl">
                            <li><a>Settings<span className="arrow-left"></span></a>
                                <ul className="dropdown">
                                    <li><Link to="/usergrid">Users</Link></li>
                                    <li><Link to="/Stories">Stories</Link></li>
                                    <li><Link to="/feature">Features</Link></li>
                                    <li><Link to="/sprints">Sprints</Link></li>
                                </ul>
                            </li>
                            <li><a> <img src="./img/ScrumMakerLogo.jpg" width="40px" height="40px" alt="lorem" className="userAvatar"></img><span className="arrow-down">Login</span></a>
                                <ul className="dropdown">
                                    <li><Link to="/edituser">Edit user</Link></li>
                                    <li><Link to="/#">About</Link></li>
                                    <li><Link to="/#">Log Out</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    </div>
            </div>
            <div className='row'>
                <div className='col-sm-2'>
                    <NavMenu />
                </div>
                <div className='col-sm-8'>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}
