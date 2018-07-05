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

    public SendData() {
        this.connection.invoke("SendMessage", this.name, this.message).catch(err => console.error(err));
    }

    public onDataReceived(sender: string, message: string) {
        let output = undefined;
        output = document.getElementById("output") as any;
        if (output.value !== '')
            output.value += '\n';
        output.value += sender + ": " + message;
        output.scrollTop = output.scrollHeight;


    }

    private updateName(e: any) {
        this.name = e.target.value;
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
            this.SendData();

    }

    render() {


        return <div className="chatWindow">
            <textarea id="output" className="chatOutput" rows={15} readOnly={true}></textarea>
            <hr />
            <div className="chatInputBlock">
                <span>Enter your name </span>
                <input type="text" onChange={this.updateName.bind(this)} />
                <br/>
                <textarea id="messageInput" className="chatInput" onKeyPress={this.updateMessage.bind(this)} />

            </div>
        </div>
    }


}




