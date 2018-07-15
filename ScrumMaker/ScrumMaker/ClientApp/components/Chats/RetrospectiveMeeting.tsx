import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { User } from '../Models/User';
import { UserBox } from './UsersBox';
import { RetrospectiveMessage } from "./RetrospectiveMessage"

interface IRetrospectiveState {
    wentWellOutPut: string;
    improvedOutput: string;
    commitOutput: string;
}

export class RetrospectiveMeeting extends React.Component<RouteComponentProps<{}>, IRetrospectiveState> {

    protected chatUrl: string = '/retrospective/chat';
    connection: HubConnection;
    name: string = "defaultName";
    message: RetrospectiveMessage = new RetrospectiveMessage("");
    usersBox: UserBox = new UserBox();
    wentWell: string = "";
    improved: string = "";
    commitTo: string = "";
    messageInfo: string = "";
    user: User = new User("");
    dateString: string = "";

    constructor() {
        super();
        this.state = { wentWellOutPut: "", improvedOutput: "", commitOutput: "" };
        this.connection = new HubConnectionBuilder().withUrl(this.chatUrl).build();
        this.connection.on("receiveMessage", this.receiveMessage.bind(this));
        this.connection.on("receiveHistory", this.receiveHistory.bind(this));
        this.connection.on("receiveUsers", this.receiveUsers.bind(this));
        this.connection.on("userConnected", this.userConnected.bind(this));
        this.connection.on("userDisconnect", this.userDisconnected.bind(this));
        this.connection.onclose(() => {
            this.messageInfo = "CONNECTION CLOSED";
            this.receiveMessage(this.message);
        });

        this.connection.start().
            then(() => {
                this.loadHistory();
                this.loadUsers();
            }).catch(err => console.error(err));

        this.handleSendButton = this.handleSendButton.bind(this);
    }

    public send() {
        this.connection.invoke("SendMessage", this.message);
    }

    loadHistory() {
        this.connection.invoke("GetHistory");
    }

    loadUsers() {
        this.connection.invoke("GetUsers");
    }

    receiveHistory(messages: string[]) {
        //messages.forEach(element => {
        //    this.receiveMessage(element.toString());
        //});
    }

    public receiveUsers(users: User[]) {
        users.forEach(element => {
            this.userConnected(element);
        });
    }

    userConnected(user: User) {
        console.log("Conected: " + user);

        if (user !== null && user !== undefined) {
            this.usersBox.users.push(user);
            this.user = user;
            this.forceUpdate();
        }
    }

    userDisconnected(user: User) {
        console.log("Disconected: " + user);

        if (user !== null && user !== undefined) {
            this.usersBox.users = this.usersBox.users.filter(u => u.login !== user.login);
            this.forceUpdate();
        }
    }

    public receiveMessage(message: RetrospectiveMessage) {

        console.log(message);

        const s = message.sendingDate.toString().replace("T", ", ").replace("Z", "");
    
        this.wentWell += message.userName + ' (' + s + ') : ' + message.wentWell + '\n';
        this.improved += message.userName + ' (' + s + ') : ' + message.couldBeImproved + '\n';
        this.commitTo += message.userName + ' (' + s + ') : ' + message.commitToDoing + '\n';

        this.setState({ wentWellOutPut: this.wentWell, improvedOutput: this.improved, commitOutput: this.commitTo });
    }

    getCurrentDate() {
        const date = new Date();

        this.dateString = date.getFullYear().toString() + "-" +
            (date.getMonth() + 1).toString() + "-" +                 //????
            date.getDate().toString() + "T" +
            date.getHours().toString() + ":" +
            date.getMinutes().toString() + ":" +
            date.getSeconds().toString() + "Z";

        console.log(this.dateString);
    }

    buildMessageToSend() {
        this.getCurrentDate();
        let wentWellInput = document.getElementById("wentWell") as any;
        let improveInput = document.getElementById("couldBeImproved") as any;
        let commitToDoigInput = document.getElementById("commitToDoing") as any;

        if (wentWellInput.value !== '' && improveInput !== '' && commitToDoigInput !== '') {

            var obj = JSON.parse('{ "SendingDate": "' + this.dateString + '", "WentWell": "' +
                wentWellInput.value + '", "CouldBeImproved": "' + improveInput.value +
                '", "CommitToDoing": "' + commitToDoigInput.value + '", "UserId": ' +
                this.user.userId + ', "UserName": "' + this.user.login + '" }');
            this.message = new RetrospectiveMessage(obj);
        }
    }

    handleSendButton(event: any) {

        this.buildMessageToSend();

        console.log(this.message);

        if (this.message !== null) {
            this.send();
        }
    }

    render() {
        return <div className="chatWindow">
            <div className="chatOutputWindow">
                <div className="chatOutput">
                    <p>What went well in the Sprint?</p>
                    <textarea id="WellOutput" className="chatOutputArea" rows={15} readOnly={true} value={this.state
                        .wentWellOutPut} />
                    <p>What could be improved?</p>
                    <textarea id="ImprovedOutput" className="chatOutputArea" rows={15} readOnly={true} value={this
                        .state.improvedOutput} />
                    <p>What will we commit to improve in the next Sprint?</p>
                    <textarea id="CommitOutput" className="chatOutputArea" rows={15} readOnly={true} value={this.state
                        .commitOutput} />
                </div>
                <div className="chatUsersBlock">
                    {this.usersBox.render()}
                </div>
            </div>
            <hr />
            <div className="chatInputBlock">
                <br />
                <p>What went well in the Sprint?</p>
                <textarea id="wentWell" className="chatInput" />
                <p>What could be improved?</p>
                <textarea id="couldBeImproved" className="chatInput" />
                <p>What will we commit to improve in the next Sprint?</p>
                <textarea id="commitToDoing" className="chatInput" />
            </div>
            <div className="text-center">
                <button style={{ marginTop: "10px" }} className="button" onClick={this.handleSendButton}>Send</button>
            </div>
        </div>;
    }
}