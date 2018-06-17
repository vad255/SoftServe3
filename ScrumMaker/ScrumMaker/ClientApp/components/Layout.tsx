import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='header'>
                <img src="./img/2888327.jpg" width="8%" height="50" alt="lorem" className='myLogo'></img>
                <div id='mySettings'>
                    <div className="navigation">
                        <ul>
                            <li><a>Settings<span className="arrow-left"></span></a>
                                <ul className="dropdown">
                                    <li><a href="/usergrid">Users</a></li>
                                    <li><a href="/Stories">Stories</a></li>
                                    <li><a href="/feature">Features</a></li>
                                    <li><a href="/sprints">Sprints</a></li>
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
