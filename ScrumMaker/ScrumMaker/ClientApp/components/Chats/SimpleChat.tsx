import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'
import { User } from '../Models/User';
import { UserBox } from './UsersBox';


export class SimpleChat extends React.Component<RouteComponentProps<{}>, any> {

    protected URL_BASE: string = '/chat';
    connection: HubConnection;
    name: string = "defaultName";
    message: string = "";
    usersBox: UserBox = new UserBox();

    constructor() {
        super();
        this.connection = new HubConnectionBuilder().withUrl(this.URL_BASE).build();
        this.connection.on("receiveMessage", this.receiveMessage.bind(this));
        this.connection.on("receiveHistory", this.receiveHistory.bind(this));
        this.connection.on("receiveUsers", this.receiveUsers.bind(this));
        this.connection.on("userConnected", this.userConnected.bind(this));
        this.connection.on("userDisconnect", this.userDisconnected.bind(this));
        this.connection.onclose(() => {
            this.message = "CONNECTION CLOSED"
            this.receiveMessage(this.message);

        })

        this.connection.start().
            then(() => {
                this.loadHistory();
                this.loadUsers()
            }).catch(err => console.error(err));
    }

    public Send() {
        this.connection.invoke("SendMessage", this.message);
    }

    loadHistory() {
        this.connection.invoke("GetHistory");
    }

    loadUsers() {
        this.connection.invoke("GetUsers");
    }

    receiveHistory(messages: string[]) {
        messages.forEach(element => {
            this.receiveMessage(element);
        });
    }

    public receiveUsers(users: User[]) {
        users.forEach(element => {
            this.userConnected(element);
        });
    }

    userConnected(user: User) {
        console.log("Conected: " + user);

        if (user != null && user != undefined) {
            this.usersBox.users.push(user);
            this.forceUpdate();
        }
    }

    userDisconnected(user: User) {
        console.log("Disconected: " + user);

        if (user != null && user != undefined) {
            this.usersBox.users = this.usersBox.users.filter(u => u.login != user.login);
            this.forceUpdate();
        }
    }

    public receiveMessage(message: string) {

        let output = undefined;
        output = document.getElementById("output") as any;
        if (output.value != '')
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
            <div className="chatOutputWindow">
                <div className="chatOutput">
                    <textarea id="output" className="chatOutputArea" rows={15} readOnly={true}></textarea>
                </div>
                <div className="chatUsersBlock">
                    {this.usersBox.render()}
                </div>
            </div>
            <hr />
            <div className="chatInputBlock">
                <br />
                <textarea id="messageInput" className="chatInput" onKeyPress={this.updateMessage.bind(this)} />
            </div>
        </div>
    }


}




