import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'
import * as moment from 'moment';
import { User } from '../Models/User';

export class Message extends React.Component<{ msg: MessageProps }, any>{

    render() {
        let my = this.props.msg.myMessage;
        console.log(my);

        let name = this.props.msg.author.login || "Anonym";
        return (
            <div className={my ? "message-container darker" : "message-container"}>
                <div className={my ? "right" : ""}>
                    <img src={"/api/userphoto/" + this.props.msg.author.userId} alt="Avatar" className={my ? "right" : ""} />
                    <div className="sender-info">
                        <p className="login-label">{name}</p>
                        <span className="time"> {this.props.msg.post.format('DD.MM.YYYY  H:MM')}</span>
                    </div>
                </div>
                <p>{this.props.msg.text}</p>

            </div >
        )
    }
}


export class MessageProps {

    public author: User;
    public post: moment.Moment;
    public text: string;
    public myMessage: boolean = false;

    constructor(msg: any) {
        this.author = new User(msg.Author);
        this.post = moment(msg.Sent);
        this.text = msg.Text;
    }
}




