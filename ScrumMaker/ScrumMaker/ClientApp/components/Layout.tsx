import * as React from 'react';
import {Link} from 'react-router-dom'
import { NavMenu } from './NavMenu';
import { stack } from 'd3-shape';
import { User } from './Models/User';

export interface LayoutProps {
    children?: React.ReactNode;
}

interface MyUser {
    Login: string,
    Photo: 'api/User/ShowPhoto'
}

export class Layout extends React.Component<LayoutProps, MyUser> {

    constructor(props: any) {
        super(props);
        this.state = {
            Login: '',
            Photo: 'api/User/ShowPhoto'
        }

        fetch('/getUser', {
            credentials: 'include',
            method: 'GET',
        }).then(response => response.json() as Promise<any>)
            .then(data => {
                this.setState({ Login: data.Login });
            });
    }

    public render() {
        let { Photo } = this.state;
        let $imagePreview = null;
        if (Photo) {
            $imagePreview = (<img width="35px" height="35px" alt="lorem" className="userAvatar" src={"/api/userphoto/" + this.state.Login} />);
        }

        return <div className='container-fluid'>
            <div id="headerPosition" className='header siteColor'>
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
                            <li><a className=""> <div>{$imagePreview} {this.state.Login}</div></a>
                                <ul className="dropdown">
                                    <li><a href="/edituser">Edit user</a></li>
                                    <li><Link to="/#">About</Link></li>
                                    <li><a href="/logout">Log Out</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    </div>
            </div>
            <div className='row'>
                <div className='col-sm-2 mainPart'>
                    <NavMenu />
                </div>
                <div className='col-sm-10 mainPart'>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}
