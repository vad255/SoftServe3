﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { User } from '../Models/User';
import { RetrospectiveMessage } from "./RetrospectiveMessage";
import { RetrospectiveTable } from "./RetrospectiveTable";

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
    table: RetrospectiveTable = new RetrospectiveTable();
    wentWell: string = "";
    improved: string = "";
    commitTo: string = "";
    dateString: string = "";
    sprintId: number = -1;

    constructor(props: any) {
        super(props);
        this.state = { wentWellOutPut: "", improvedOutput: "", commitOutput: "" };
        this.connection = new HubConnectionBuilder().withUrl(this.chatUrl).build();
        this.connection.on("receiveMessage", this.receiveMessage.bind(this));
        this.connection.on("receiveHistory", this.receiveHistory.bind(this));
        this.connection.on("receiveUsers", this.receiveUsers.bind(this));
        this.connection.on("userConnected", this.userConnected.bind(this));
        this.connection.on("userDisconnect", this.userDisconnected.bind(this));

        this.connection.start().
            then(() => {
                this.loadHistory();
                this.loadUsers();
            }).catch(err => console.error(err));

        this.handleSendButton = this.handleSendButton.bind(this);
        this.sprintId = this.props.location.state.sprintId as number;
        console.log(this.sprintId);
    }

    public send() {
        this.connection.invoke("SendMessage", this.message, this.sprintId);

    }

    loadHistory() {
        this.connection.invoke("GetHistory");
    }

    loadUsers() {
        this.connection.invoke("GetUsers");
    }

    receiveHistory(messages: string[]) {
    }

    public receiveUsers(users: User[]) {
        users.forEach(element => {
            this.userConnected(element);
        });
    }

    userConnected(user: User) {
        console.log("Conected: " + user);

        if (user !== null && user !== undefined) {
            this.table.addUser(user);
            this.forceUpdate();
            this.table.updateLayout(this.table.getListitems());
            this.forceUpdate();

        }
    }

    userDisconnected(user: User) {
        console.log("Disconected: " + user);

        if (user !== null && user !== undefined) {
            this.table.removeUser(user);
            this.forceUpdate();
            this.table.updateLayout(this.table.getListitems());
            this.forceUpdate();

        }
    }

    public receiveMessage(message: RetrospectiveMessage) {

        const s = message.sendingDate.toString().replace("T", ", ").replace("Z", "");

        this.wentWell += message.userName + ' (' + s + ') : ' + message.wentWell + '\n';
        this.improved += message.userName + ' (' + s + ') : ' + message.couldBeImproved + '\n';
        this.commitTo += message.userName + ' (' + s + ') : ' + message.commitToDoing + '\n';

        this.setState({ wentWellOutPut: this.wentWell, improvedOutput: this.improved, commitOutput: this.commitTo });
    }

    buildMessageToSend() {

        let wentWellInput = document.getElementById("wentWell") as any;
        let improveInput = document.getElementById("couldBeImproved") as any;
        let commitToDoigInput = document.getElementById("commitToDoing") as any;

        if (wentWellInput.value !== '' && improveInput !== '' && commitToDoigInput !== '') {

            var obj = JSON.parse('{ "WentWell": "' + wentWellInput.value + '", "CouldBeImproved": "'
                + improveInput.value + '", "CommitToDoing": "' + commitToDoigInput.value + '" }');
            this.message = new RetrospectiveMessage(obj);
        }
    }

    handleSendButton(event: any) {

        this.buildMessageToSend();

        if (this.message !== null) {
            this.send();
        }
    }

    render() {
        return <div className="chatWindow">
            <div className="RetrospectiveTable" style={{ background: `url("img/RetrospectiveTable.jpg") no-repeat` }}>
                {this.table.render()}
            </div>
            <hr />
            <div className="RetrospectivechatOutputWindow">
                <div className="RetrospectivechatOutput">
                    <p className="PChat">What went well in the Sprint?</p>
                    <textarea id="WellOutput" className="RetrospectivechatOutputArea"
                        rows={15} readOnly={true} value={this.state
                            .wentWellOutPut} />
                </div>
                <div className="RetrospectivechatOutput">
                    <p className="PChat">What could be improved?</p>
                    <textarea id="ImprovedOutput" className="RetrospectivechatOutputArea"
                        rows={15} readOnly={true} value={this
                            .state.improvedOutput} />
                </div>
                <div className="RetrospectivechatOutput">
                    <p className="PChat">What will we commit to improve in the next Sprint?</p>
                    <textarea id="CommitOutput" className="RetrospectivechatOutputArea"
                        rows={15} readOnly={true} value={this.state
                            .commitOutput} />
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