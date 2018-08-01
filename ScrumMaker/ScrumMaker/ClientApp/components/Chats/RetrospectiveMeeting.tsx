import * as React from 'react';
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
    user: User = new User("");

    constructor(props: any) {
        super(props);
        this.state = { wentWellOutPut: "", improvedOutput: "", commitOutput: "" };
        this.sprintId = this.props.location.state.sprintId as number;
        this.connection = new HubConnectionBuilder().withUrl(this.chatUrl + "?token=" + this.sprintId).build();
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
        this.handleSendEmailButtonClick = this.handleSendEmailButtonClick.bind(this);
        this.downloadTxtFile = this.downloadTxtFile.bind(this);
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

    public receiveUsers(users: UserInfo[], sI: number) {

        users.forEach(element => {
            if (sI === element.sprintId) {
                this.userConnected(element.user);
            }
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

        let s = message.sendingDate.toString().replace("T", "  ").slice(0, 20);

        this.wentWell += message.userName + ' (' + s + '): ' + message.wentWell + '\n';
        this.improved += message.userName + ' (' + s + '): ' + message.couldBeImproved + '\n';
        this.commitTo += message.userName + ' (' + s + '): ' + message.commitToDoing + '\n';

        this.setState({ wentWellOutPut: this.wentWell, improvedOutput: this.improved, commitOutput: this.commitTo });
    }

    buildMessageToSend() {

        let wentWellInput = document.getElementById("wentWell") as any;
        let improveInput = document.getElementById("couldBeImproved") as any;
        let commitToDoigInput = document.getElementById("commitToDoing") as any;

            var obj = JSON.parse('{ "WentWell": "' +
                wentWellInput.value +
                '", "CouldBeImproved": "' +
                improveInput.value +
                '", "CommitToDoing": "' +
                commitToDoigInput.value +
                '" }');
            this.message = new RetrospectiveMessage(obj);

    }

    handleSendButton(event: any) {

        this.buildMessageToSend();

        if (this.message !== null) {
            this.send();
        }

        let input = document.getElementById("wentWell") as any;
        let input1 = document.getElementById("couldBeImproved") as any;
        let input2 = document.getElementById("commitToDoing") as any;
        input.value = "";
        input1.value = "";
        input2.value = "";
    }

    downloadTxtFile() {
        fetch('/SaveTxtFile');
    }

    private getDeleteConfirmModal() {
        return <div id="confirmDeleteModal" className="modal fade">
                   <div className="modal-dialog">
                       <div className="modal-content">
                           <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                               <h4 className="modal-title">The Sprint Retrospective was sent to email</h4>
                           </div>
                           <div className="modal-body text-center">
                               <button className="btn btn-default" type="button" data-dismiss="modal">
                                   Ok</button>
                           </div>
                       </div>
                   </div>
               </div>;
    }

    handleSendEmailButtonClick() {

        const data = new FormData();
        data.append("sprintId", this.sprintId.toString());
        data.append("toEmail", this.user.login);

        fetch('/SendEmail',
            {
                method: 'POST',
                body: data
            });
    }

    render() {
        return <div className="chatWindow">
            <div>
                <div className="RDiv">
                    <div className="RetrospectiveTable" style={{ background: `url("img/RetrospectiveTable.jpg") no-repeat` }}>
                        {this.table.render()}
                    </div>
                    <div style={{ width: "30%" }}>
                        <button style={{ margin: "10px" }}
                            className="btn-success" onClick={this.downloadTxtFile}>Save Meeting Result</button>
                        <button style={{ margin: "10px" }}
                            className="btn-success"
                                data-toggle="modal"
                                data-target="#confirmDeleteModal"
                            onClick={this.handleSendEmailButtonClick}>Send meeting result to email</button>
                    </div>
                </div>
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
                <button style={{ marginTop: "10px" }}
                    className="button" onClick={this.handleSendButton}>Send</button>
            </div>
            {this.getDeleteConfirmModal()}
        </div>;
    }
}

export class UserInfo {
    user: User = new User("");
    sprintId: number = -1;
}