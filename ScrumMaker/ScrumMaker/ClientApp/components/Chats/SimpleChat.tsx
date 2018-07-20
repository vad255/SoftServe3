import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'
import { User } from '../Models/User';
import { UserBox } from './UsersBox';
import { MessageProps } from './Message';
import { OutputBox } from './OutputBox';

export interface IGlobalChat {
    messages: MessageProps[],
    members: User[],
    myself: User
}


export class SimpleChat extends React.Component<RouteComponentProps<{}>, IGlobalChat> {

    protected URL_BASE: string = '/chat';
    connection: HubConnection;
    name: string = "defaultName";
    message: string = "";

    constructor() {
        super();
        this.state = { messages: [], members: [], myself: new User({}) }

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

        let div: any = {};
        div = document.getElementById("OutputSection");
        div.setAttribute("style", `height:${window.innerHeight * 0.6}px`);

        this.connection.start().
            then(() => this.getMyself()).
            then(() => {
                this.connection.invoke("GetHistory");
                this.connection.invoke("GetUsers");
            }).catch(err => console.error(err));
    }

    public Send(message: string) {
        this.connection.invoke("SendMessage", message);
    }

    getMyself(): Promise<any> {
        return fetch('/myself',
            { credentials: "include" }).
            then(response => response.json() as Promise<any>).
            then(data => {

                let user = new User(data);
                if (user.userId === 0)
                    user.userId = -1;
                console.log("receive");
                console.log(user);

                this.setState({ myself: user })
            });
    }

    receiveHistory(history: string[]) {
        let currUserId =
            this.state.myself.userId > 0 ?
                this.state.myself.userId :
                -2;
        console.log("CurrUsr: " + currUserId);

        let msgs: MessageProps[] = history.map(m => {
            let result = new MessageProps(JSON.parse(m))
            result.myMessage = (result.author.userId === currUserId);
            console.log(currUserId + " == " + result.author.userId + " = " + result.myMessage);


            return result;
        });
        console.log(msgs);

        this.setState({ messages: msgs })
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

        console.log(this.state.myself);


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
                    <OutputBox messages={this.state.messages} myself={this.state.myself} />
                    <UserBox users={this.state.members} />
                </div>
                <hr />
                <textarea id="messageInput" className="chatInput" onKeyPress={this.handleInput.bind(this)} />
            </div>

        )
    }


}




