import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'
import * as moment from 'moment';
import { User } from '../Models/User';

export class Message extends React.Component<{ msg: MessageProps }, any>{

    render() {
        return (
            <div>
                <h5>{this.props.msg.author.login || "Anonym"}</h5>
                <span>
                    {this.props.msg.post.format('DD.MM.YYYY  H:MM')}
                </span>
                <label>
                    {this.props.msg.text}
                </label>
                <br />
            </div>
        )
    }
}


export class MessageProps {

    public author: User;
    public post: moment.Moment;
    public text: string;

    constructor(msg: any) {

        this.author = new User(msg.Author);
        this.post = moment(msg.Sent);
        this.text = msg.Text;
    }
}




