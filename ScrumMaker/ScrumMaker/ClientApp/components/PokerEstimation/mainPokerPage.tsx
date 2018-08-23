import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import * as Modal from 'react-modal';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'
import { PokerUser } from '../Models/PokerUser';
import { PokerUsersBox } from './PokerUsersBox';
import { PokerTable } from './pokerTable';
import { Story } from '../Models/Story';
import { ProductBacklog } from '../Backlog/ProductBacklog';
import { MessageProps } from '../Chats/Message';
import { User } from '../Models/User';
import { setAppElement } from 'react-modal';

export interface IGlobalChat {
    finalMark: number
    messages: MessageProps[],
    members: PokerUser[],
    myself: PokerUser
    storiesProd: Story[],
    currentStory: Story,
    display: boolean,
    displayPokerCard: boolean,
    confirmModal: boolean,
    activeDisable: boolean,
    meetingInProgress: boolean,
    history: IGlobalChat,
    rec: boolean
}

export class MainPokerPage extends React.Component<RouteComponentProps<{}>, IGlobalChat> {

    protected URL_BASE: string = '/pokerRoom';
    connection: HubConnection;
    name: string = "defaultName";
    message: string = "";

    table: PokerTable = new PokerTable();
    productBacklog: ProductBacklog = new ProductBacklog();
    finalMark: any = undefined;

    constructor() {
        super();
        this.loadProductBacklog();

        this.state = { finalMark: -1, messages: [], members: [], myself: new PokerUser({}), storiesProd: [], currentStory: new Story({}), display: false, displayPokerCard: false, confirmModal: false, activeDisable: false, meetingInProgress: true, history: this.state, rec: false }

        this.connection = new HubConnectionBuilder().withUrl(this.URL_BASE).build();
        this.connection.on("receiveHistory", this.receiveHistory.bind(this));
        this.connection.on("receiveUsers", this.receiveUsers.bind(this));
        this.connection.on("receiveMessage", this.receiveMessage.bind(this));
        this.connection.on("receiveRec", this.receiveRec.bind(this));
        this.connection.on("receiveActiveDisable", this.receiveActiveDisable.bind(this));
        this.connection.on("receiveStartOfFinish", this.receiveStartOfFinish.bind(this));
        this.connection.on("receivePokerMark", this.receivePokerMark.bind(this));
        this.connection.on("receiveReviewPoints", this.receiveReviewPoints.bind(this));
        this.connection.on("userConnected", this.userConnected.bind(this));
        this.connection.on("userDisconnect", this.userDisconnected.bind(this));
        this.changeStoryOnTable = this.changeStoryOnTable.bind(this);
        this.changeFinalMark = this.changeFinalMark.bind(this);

    }

    public componentDidMount() {
    var stage = window.localStorage.getItem("History") != null ? window.localStorage.getItem("History") : JSON.stringify(this.state);
        let div: any = {};
        div = document.getElementById("outUser");
        div.setAttribute("style", `height:${window.innerHeight * 0.6}px`);

        this.connection.start().
            then(() => this.getMyself()).
            then(() => {
                this.connection.invoke("GetHistory");
                this.connection.invoke("GetUsers");
            }).catch(err => console.error(err));
        this.setState(JSON.parse(stage != null ? stage : JSON.stringify(this.state)));
    }

    getMyself(): Promise<any> {
        return fetch('/myself',
            { credentials: "include" }).
            then(response => response.json() as Promise<any>).
            then(data => {

                let user = new PokerUser(data);
                if (user.userId === 0)
                    user.userId = -1;

                this.setState({ myself: user, history: this.state })
            });
    }

    receiveHistory(history: string[]) {
        let currUserId =
            this.state.myself.userId > 0 ?
                this.state.myself.userId :
                -2;

        let msgs: MessageProps[] = history.map(m => {
            let result = new MessageProps(JSON.parse(m))
            result.myMessage = (result.author.userId === currUserId);

            return result;
        });

        this.setState({ messages: msgs })
    }

    public receiveMessage(response: any) {
        if (response === null) {
            this.setState({
                currentStory: new Story({}),
                display: false,
                history: this.state
            });
        }
        else {
            this.setState({
                currentStory: response,
                display: true,
                history: this.state
            });
        }
    }

    public receiveStartOfFinish(response: any) {
        if (response) {
            this.setState({
                displayPokerCard: !this.state.displayPokerCard,
                history: this.state
            })
        }
        else {

            this.setState({
                displayPokerCard: false,
                display: false,
                history: this.state
            })
        }

    }

    public receivePokerMark(responese: PokerUser) {
        let newList = this.state.members.filter(u => u.userId != responese.userId);
        newList.push(responese);
        this.setState({
            members: newList,
            history: this.state
        })

    }

    public receiveUsers(users: PokerUser[]) {
        users.forEach(element => {
            this.userConnected(element);
        });
    }

    public receiveRec(e: boolean) {
        this.setState({
            rec: e
        })
    }

    public receiveReviewPoints(review: boolean, storyWithMark: Story) {
        if (storyWithMark == null) {
            this.setState({
                confirmModal: review,
                finalMark: -1,
                history: this.state
            })
        }
        else {
            var newStoryList = this.state.storiesProd
            newStoryList.forEach(s => s.id == storyWithMark.id ? s.pokerMark = storyWithMark.pokerMark : null)

            this.setState({
                confirmModal: review,
                finalMark: storyWithMark.pokerMark,
                storiesProd: newStoryList,
                history: this.state
            })
        }
    }

    public receiveActiveDisable(activeOrDisable: boolean) {
        this.setState({
            activeDisable: activeOrDisable,
            history: this.state
        })

        this.changeActivity(activeOrDisable);
    }

    loadProductBacklog() {
        fetch(this.productBacklog.URL_BASE, { credentials: "include" })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let tempProd: Story[] = [];
                for (var i = 0; i < data["value"].length; i++) {
                    tempProd.push(new Story(data["value"][i]));
                }
                this.productBacklog.stories = tempProd;
                this.setState({ storiesProd: tempProd, history: this.state });
            })
    }

    userConnected(user: PokerUser) {

        if (user) {
            var newUser = this.state.members.filter(u => u.userId === user.userId);
            if (newUser.length === 0) {
                this.state.members.push(user);
            }
            this.setState(this.state);

            this.table.addUser(user);
            this.forceUpdate();
            this.table.updateLayout(this.table.getListitems());
            this.forceUpdate();
        }
    }

    userDisconnected(user: PokerUser) {

        if (user) {
            let newList = this.state.members.filter(u => u.login != user.login);
            this.setState({ members: newList, history: this.state });

            this.table.removeUser(user);
            this.forceUpdate();
            this.table.updateLayout(this.table.getListitems());
            this.forceUpdate();
        }
    }

    public SendMark(user: PokerUser) {
        this.connection.invoke("SendMark", user);
    }

    public SendStoryBox(story: Story) {
        if (story.id != undefined) {
            this.connection.invoke("SendStoryOnTable", story.id);
        }
        else {
            this.connection.invoke("SendStoryOnTable", -1);
        }
    }

    public SendStartOrEnd(e: boolean) {
        this.connection.invoke("SendStartOrFinishPoker", e);
    }

    public SendReviewPoints(e: boolean, finalMark: number) {
        this.connection.invoke("SendReviewPoints", e, finalMark, this.state.currentStory.id);
    }

    public SendRec(e: boolean) {
        this.connection.invoke("SendRec", e);
    }

    public SendActiveDisable(e: boolean) {
        this.connection.invoke("SendActiveDisable", e);
    }

    public SendState() {
        var storage = window.localStorage;
        storage.setItem("History", JSON.stringify(this.state));
    }

    changeActivity(e: boolean) {
        let button: any = {};
        let button1: any = {};
        let button2: any = {};
        let button3: any = {};
        let button4: any = {};
        let button5: any = {};
        let button6: any = {};
        let button7: any = {};
        let button8: any = {};
        button = document.getElementById("pokerMarks");
        button1 = document.getElementById("pokerMarks1");
        button2 = document.getElementById("pokerMarks2");
        button3 = document.getElementById("pokerMarks3");
        button4 = document.getElementById("pokerMarks4");
        button5 = document.getElementById("pokerMarks5");
        button6 = document.getElementById("pokerMarks6");
        button7 = document.getElementById("pokerMarks7");
        button8 = document.getElementById("pokerMarks8");

        if (e) {
            button.setAttribute('disabled', e);
            button1.setAttribute('disabled', e);
            button2.setAttribute('disabled', e);
            button3.setAttribute('disabled', e);
            button4.setAttribute('disabled', e);
            button5.setAttribute('disabled', e);
            button6.setAttribute('disabled', e);
            button7.setAttribute('disabled', e);
            button8.setAttribute('disabled', e);
        }
        if(!e) {
            button.removeAttribute('disabled');
            button1.removeAttribute('disabled');
            button2.removeAttribute('disabled');
            button3.removeAttribute('disabled');
            button4.removeAttribute('disabled');
            button5.removeAttribute('disabled');
            button6.removeAttribute('disabled');
            button7.removeAttribute('disabled');
            button8.removeAttribute('disabled');
        }
    }

    activeDisable(e: boolean) {

        this.SendActiveDisable(e);

        this.changeActivity(false);
    }

    changeSelectorCard(mark: any) {

        var user = this.state.myself;
        user.userMark = mark;

        this.SendMark(user);
    }

    startOrFinishPoker() {
        if (this.state.displayPokerCard == false) {
            this.setState({
                meetingInProgress: false,
                history: this.state,
            })
            this.SendRec(true);
            this.SendStartOrEnd(true)
        }
        if (this.state.displayPokerCard == true) {
            this.SendStartOrEnd(false)
            this.SendRec(false);
        }
    }

    changeStoryOnTable(story: Story) {

        var newList = this.state.members;
        newList.forEach(u => u.userMark = -1);
        newList.forEach(u => this.SendMark(u));

        this.setState({
            meetingInProgress: true,
        })

        if (this.state.displayPokerCard == true) {
            this.SendStoryBox(story);
            this.activeDisable(false);
        }
    }

    savePokerPoints(e: boolean, mark: number) {
        if (e) {
            this.SendReviewPoints(e, mark);
            this.activeDisable(true);
        }
        else {
            var newList = this.state.members;
            newList.forEach(u => u.userMark = -1);
            newList.forEach(u => this.SendMark(u));

            this.setState({
                meetingInProgress: false,
                history: this.state
            })

            this.SendReviewPoints(e, mark);
            this.activeDisable(true);
            this.SendStoryBox(new Story({}));
        }
    }

    cancelPoker() {
        this.SendStoryBox(new Story({}));

        var newList = this.state.members;
        newList.forEach(u => u.userMark = -1);
        newList.forEach(u => this.SendMark(u));

        this.setState({
            meetingInProgress: false,
            history: this.state
        })
        this.SendReviewPoints(false, -1);
    }

    voteAgain() {

        var newList = this.state.members;
        newList.forEach(u => u.userMark = -1);
        newList.forEach(u => this.SendMark(u));

        this.setState({
            meetingInProgress: true,
            history: this.state
        })

        this.SendReviewPoints(false, -1);
        this.activeDisable(false);

    }

    public changeFinalMark(e: any) {
        this.setState({
            finalMark: e.target.value,
            history: this.state
        })
    }

    render() {
        if (this.state.rec == true) {
            this.SendState();
        }

        var startFinishButton;
        if (this.state.myself.role.name === "ScrumMaster") {
            startFinishButton = <button className={this.state.displayPokerCard == false ? "startPokerButton" : "finishPokerButton"} onClick={() => this.startOrFinishPoker()}>{this.state.displayPokerCard == false ? "Start Poker" : "Finish Poker"}</button>;
        }

        var reviewMarkButton;
        if (this.state.myself.role.name === "ScrumMaster" && this.state.display == true) {
            reviewMarkButton = <button className="reviewPoint" onClick={() => this.savePokerPoints(true, -1)}>Review points</button>;
        }

        var storyButton;
        if (this.state.myself.role.name === "ScrumMaster" && this.state.meetingInProgress == false) {
            storyButton = this.state.storiesProd.map(u => u.pokerMark != undefined ? <button disabled className="storyButton" onClick={() => this.changeStoryOnTable(u)} key={u.id}>Name: {u.name} Mark: {u.pokerMark}</button> : <button className = "storyButton" onClick = {() => this.changeStoryOnTable(u)} key = { u.id } > Name: { u.name } </button >);
        }
        else {
            storyButton = this.state.storiesProd.map(u => u.pokerMark != undefined ? <button disabled className="storyButton" onClick={() => this.changeStoryOnTable(u)} key={u.id}>Name: {u.name} Mark: {u.pokerMark}</button> : <button disabled className="storyButton" onClick={() => this.changeStoryOnTable(u)} key={u.id}>Name: {u.name} {u.pokerMark}</button>);
        }

        var modalWindow;
        if (this.state.myself.role.name === "ScrumMaster") {
            modalWindow = <Modal isOpen={this.state.confirmModal}                 
                className="pokerModal">
                <div>
                    <label className="pokerSelectLabel">Pick final estimation:</label>
                    <select className="pokerSelectEvent form-control" onChange={this.changeFinalMark}>
                        <option disabled>Select mark:</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="8">8</option>
                        <option value="13">13</option>
                        <option value="40">40</option>
                        <option value="100">100</option>
                    </select>
                    <button className="pokerBtn" onClick={() => this.voteAgain()}>Vote Again</button>
                    <button className="pokerBtn" onClick={() => this.cancelPoker()}>Cancel</button>
                    <button className="pokerBtn" onClick={() => this.savePokerPoints(false, this.state.finalMark)}>Save</button>

                </div>
            </Modal>
        }

        return (
            <div className="pokerMain">
                {modalWindow}
                {startFinishButton}
                <div className="PokerTable" style={{ background: `url("img/pokerTable.jpg") no-repeat` }}>
                    {this.state.display == true ? <input className="tableBox" value={this.state.currentStory.name}></input> : null}
                    {this.table.render()}
                </div>
                <div id="outUser">
                    <PokerUsersBox users={this.state.members} currentUserId={this.state.myself} startOrFinish={this.state.displayPokerCard} confirmMadal={this.state.confirmModal} />
                    <ul id="outUser" className="storyBox">
                        {storyButton}
                    </ul>
                </div>
                {reviewMarkButton}
                {this.state.displayPokerCard == true && this.state.display == true ? <div className="cards clearfix">
                    <button className="card" id="pokerMarks" onClick={() => this.changeSelectorCard(1)}>1</button>
                    <button className="card" id="pokerMarks1" onClick={() => this.changeSelectorCard(2)}>2</button>
                    <button className="card" id="pokerMarks2" onClick={() => this.changeSelectorCard(3)}>3</button>
                    <button className="card" id="pokerMarks3" onClick={() => this.changeSelectorCard(5)}>5</button>
                    <button className="card" id="pokerMarks4" onClick={() => this.changeSelectorCard(8)}>8</button>
                    <button className="card" id="pokerMarks5" onClick={() => this.changeSelectorCard(13)}>13</button>
                    <button className="card" id="pokerMarks6" onClick={() => this.changeSelectorCard(40)}>40</button>
                    <button className="card" id="pokerMarks7" onClick={() => this.changeSelectorCard(100)}>100</button>
                </div> :
                    null}
            </div>
        )
    }
}




