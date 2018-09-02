import * as React from 'react';
import { Link } from 'react-router-dom'
import { NavMenu } from './NavMenu';
import { stack } from 'd3-shape';
import { User } from './Models/User';
import { ChatBox } from "./Chats/ChatBox";

export interface LayoutProps {
    children?: React.ReactNode;
}

interface MyUser {
    Login: string,
    Photo: 'api/User/ShowPhoto',
    Chat: boolean
}

export class Layout extends React.Component<LayoutProps, MyUser> {

    constructor(props: any) {
        super(props);
        this.state = {
            Login: '',
            Photo: 'api/User/ShowPhoto',
            Chat: false
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

        var chat;
        if (this.state.Chat == true) {
            chat = <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <ChatBox />
            </div>
        }

        return <div className='container-fluid'>
            <div id="headerPosition" className='header siteColor'>
                <img src="./img/NewLogo.png" width="150" height="50" className="myLogo" />
                <div id='mySettings'>
                    <div className="navigation fontFamily" id="aColor">
                        <ul id="rigthUl">
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

            <div className="popup-box popup-box-on">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true" style={{ marginBottom: "0px" }}>
                    <div className="panel panel-default">
                        {chat}
                        <div className="panel-heading" role="tab" id="headingOne">
                            <h4 className="panel-title text-center">
                                <button className="userbtn1" onClick={() => this.setState({
                                    Chat: !this.state.Chat
                                })}>Open/Close the Chat</button>
                            </h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>;
    }
}
