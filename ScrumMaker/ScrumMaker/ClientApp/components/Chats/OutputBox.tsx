import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'
import { MessageProps, Message } from './Message';
import { User } from '../Models/User';


export class OutputBox extends React.Component<{ messages: MessageProps[], myself: User }, any> {

    render() {
        return <div id="messageWindow" className="chatMessagesOutput">
            {this.props.messages.map((m, i) => <Message
                key={i}
                msg={m}
            />)}
        </div>
    }

    componentDidUpdate() {
        let div: any = {};
        div = document.getElementById("messageWindow");
        console.log(div);
        console.log(div.scrollHeight);

        div.scrollTop = div.scrollHeight;
    }



}




