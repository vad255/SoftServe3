import * as React from 'react';
import {Link} from 'react-router-dom'
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='header siteColor'>
                <img src="./img/NewLogo.png" width="150" height="50" className="myLogo"/>
                <div id='mySettings'>
                    <div className="navigation fontFamily" id="aColor">
                        <ul id="rigthUl">
                            <li><a className="aColor">Settings<span className="arrow-left"></span></a>
                                <ul className="dropdown">
                                    <li><Link to="/usergrid">Users</Link></li>
                                    <li><Link to="/Stories">Stories</Link></li>
                                    <li><Link to="/feature">Features</Link></li>
                                    <li><Link to="/sprints">Sprints</Link></li>
                                </ul>
                            </li>
                            <li><a className=""> <img src="./img/ScrumMakerLogo.jpg" width="35px" height="35px" alt="lorem" className="userAvatar"></img><span id="userLogin">Login</span></a>
                                <ul className="dropdown">
                                    <li><a href="/edituser">Edit user</a></li>
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
                <div className='col-sm-10'>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}
