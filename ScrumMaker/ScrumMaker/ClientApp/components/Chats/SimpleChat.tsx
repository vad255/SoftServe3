import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'
import { User } from '../Models/User';
import { UserBox } from './UsersBox';
import { MessageProps } from './Message';
import { OutputBox } from './OutputBox';
import '../../css/chat.css';

export interface IGlobalChat {
    messages: MessageProps[],
    members: User[]
}


export class SimpleChat extends React.Component<RouteComponentProps<{}>, IGlobalChat> {

    protected URL_BASE: string = '/chat';
    connection: HubConnection;
    name: string = "defaultName";
    message: string = "";

    constructor() {
        super();
        this.state = { messages: [], members: [] }

        this.connection = new HubConnectionBuilder().withUrl(this.URL_BASE).build();
        this.connection.on("receiveMessage", this.receiveMessage.bind(this));
        this.connection.on("receiveHistory", this.receiveHistory.bind(this));
        this.connection.on("receiveUsers", this.receiveUsers.bind(this));
        this.connection.on("userConnected", this.userConnected.bind(this));
        this.connection.on("userDisconnect", this.userDisconnected.bind(this));
        this.connection.onclose(() => {
            this.receiveMessage("CONNECTION CLOSED");
        })
    }

    public componentDidMount() {
        this.connection.start().
            then(() => {
                this.loadHistory();
                this.loadUsers()
            }).catch(err => console.error(err));

        let div: any = {};
        div = document.getElementById("OutputSection");
        div.setAttribute("style", `height:${window.innerHeight * 0.6}px`);

    }

    public Send(message: string) {
        this.connection.invoke("SendMessage", message);
    }

    loadHistory() {
        this.connection.invoke("GetHistory");
    }

    loadUsers() {
        this.connection.invoke("GetUsers");
    }

    receiveHistory(history: string[]) {
        let msgs: MessageProps[] = history.map(m => new MessageProps(JSON.parse(m)));

        this.setState({ messages: msgs })
        // messages.forEach(element => {
        //     this.receiveMessage(element);
        // });
    }

    public receiveUsers(users: User[]) {
        users.forEach(element => {
            this.userConnected(element);
        });
    }

    userConnected(user: User) {
        console.log("Conected: " + user);

        if (user) {
            this.state.members.push(user);
            this.setState(this.state);
        }
    }

    userDisconnected(user: User) {
        console.log("Disconected: " + user);

        if (user) {
            let newList = this.state.members.filter(u => u.login != user.login);
            this.setState({ members: newList });
        }
    }

    public receiveMessage(response: any) {
        this.state.messages.push(new MessageProps(JSON.parse(response)));
        this.setState(this.state);
    }

    private handleInput(e: any) {

        if (e.key !== 'Enter' || e.shiftKey)
            return;

        let input = undefined;
        input = document.getElementById("messageInput") as any;
        let message = input.value;
        input.value = "";
        e.preventDefault();
        if (message)
            this.Send(message);
    }

    render() {
        return (
            <div className="chatWindow">
                <div id="OutputSection" className="chatOutputSection">
                    <OutputBox messages={this.state.messages} />
                    <UserBox users={this.state.members} />
                </div>
                <hr />
                <textarea id="messageInput" className="chatInput" onKeyPress={this.handleInput.bind(this)} />
            </div>

        )
    }


}




