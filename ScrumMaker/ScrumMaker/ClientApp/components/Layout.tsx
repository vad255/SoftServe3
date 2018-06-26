import * as React from 'react';
import {Link} from 'react-router-dom'
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='header'>
                <img src="./img/ScrumMakerLogo.jpg" width="5%" height="5%" alt="#" className='myLogo'></img>
                <div id='mySettings'>
                    <div className="navigation">
                        <ul id="rigthUl">
                            <li><a>Settings<span className="arrow-left"></span></a>
                                <ul className="dropdown">
                                    <li><Link to="/usergrid">Users</Link></li>
                                    <li><a href="/Stories">Stories</a></li>
                                    <li><a href="/feature">Features</a></li>
                                    <li><a href="/sprints">Sprints</a></li>
                                </ul>
                            </li>
                            <li><a> <img src="./img/2888327.jpg" width="30px" height="30px" alt="lorem" className="userAvatar"></img><span className="arrow-down"></span></a>
                                <ul className="dropdown">
                                    <li><a href="/#">Edit user</a></li>
                                    <li><a href="/#">About</a></li>
                                    <li><a href="/#">Log Out</a></li>
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
