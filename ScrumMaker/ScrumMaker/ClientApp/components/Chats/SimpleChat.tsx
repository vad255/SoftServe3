import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'

export class SimpleChat extends React.Component<RouteComponentProps<{}>, any> {

    protected URL_BASE: string = '/chat';
    connection: HubConnection;
    name: string = "defaultName";
    message: string = "";


    constructor() {
        super();
        this.connection = new HubConnectionBuilder().withUrl(this.URL_BASE).build();
        this.connection.on("ReceiveMessage", this.onDataReceived.bind(this));
        this.connection.start().catch(err => console.error(err));
    }

    public Send() {
        fetch('api/chat/send',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.message),
                credentials: 'include'
            });
    }

    public onDataReceived(message: string) {
        let output = undefined;
        output = document.getElementById("output") as any;
        if (output.value !== '')
            output.value += '\n';
        output.value += message;
        output.scrollTop = output.scrollHeight;
    }

    private updateMessage(e: any) {

        if (e.key !== 'Enter' || e.shiftKey)
            return;

        let input = undefined;
        input = document.getElementById("messageInput") as any;
        this.message = input.value;
        input.value = null;
        e.preventDefault();
        if (this.message != undefined && this.message != null && this.message != '')
            this.Send();
    }

    render() {
        return <div className="chatWindow">
        <div></div><div>
            <textarea id="output" className="chatOutput" rows={15} readOnly={true}></textarea>
            </div>
            <hr />
            <div className="chatInputBlock">
                <br />
                <textarea id="messageInput" className="chatInput" onKeyPress={this.updateMessage.bind(this)} />
            </div>
        </div>
    }


}




