import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Story } from "../Models/Story";
import { StoryStatus } from "../Models/Story";
import { User } from "../Models/User";
import { Team } from "../Models/Team";
import { Sprint } from "../Models/Sprint";
import { Modal } from "react-bootstrap";

interface ICreatePageState {
    statusValue: string;
    inputValue: string;
    textAreaValue: string;
    users: User[];
    userId: number;
    team: Team;
    sprints: Sprint[];
    sprintId: number;
    modalMessage: string;
}

export class CreateStory extends React.Component<RouteComponentProps<any>, ICreatePageState> {
    constructor(props: any) {
        super(props);
        this.state = (({
            statusValue: "0",
            inputValue: "",
            textAreaValue: "",
            users: [],
            userId: 0,
            team: Team,
            sprints: [],
            sprintId: 0,
            modalMessage: ""
        }) as any);

        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleStatusSelect = this.handleStatusSelect.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.handleUserSelect = this.handleUserSelect.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleSprintSelect = this.handleSprintSelect.bind(this);

        fetch('odata/sprints?$expand=team($Expand=members)', { credentials: 'include' }).then(response => response.json() as Promise<any>)
            .then(data => {
                let s = data["value"];
                let sprints: Sprint[] = [];
                for (var i = 0; i < s.length; i++) {
                    let sp = new Sprint(s[i]);
                    sprints.push(sp);
                }
                this.setState({
                    sprints: sprints, team: sprints[0].team,
                    users: sprints[0].team.members, sprintId: sprints[0].id,
                    userId: sprints[0].team.members[0].userId
                });
            });
    }

    handleCreateButtonClick() {
        if (this.state.inputValue !== "" && this.state.textAreaValue !== "") {
            this.setState({ modalMessage: "The story " + this.state.inputValue + " was created." });
            fetch('odata/Stories',
                {
                    method: 'Post',
                    headers: {
                        'OData-Version': '4.0',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;odata.metadata=minimal',
                    },
                    body: JSON.stringify({
                        '@odata.type': 'DAL.Models.Story',
                        'Name': this.state.inputValue,
                        'Description': this.state.textAreaValue,
                        'Status': this.state.statusValue,
                        'SprintId': this.state.sprintId,
                        'UserId': this.state.userId,
                        'TeamId': this.state.team.id,
                    })
                });
        } else {
            this.setState({ modalMessage: "Enter the name and description please!" });
        }
    }

    private GetCreateConfirmModal() {
        return <div id="confirmDeleteModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                        <h4 className="modal-title">{this.state.modalMessage}</h4>
                    </div>
                    <div className="modal-body text-center">
                        <button className="btn-dark scrum-btn" type="button" data-dismiss="modal" onClick={this.handleOkButtonClick} >
                            Ok</button>
                    </div>
                </div>
            </div>
        </div>;
    }

    handleOkButtonClick() {
        if (this.state.modalMessage !== "Enter the name and description please!")
            this.props.history.push("/Stories");
    }

    handleUserSelect(event: any) {
        this.setState({ userId: event.target.value });
    }

    handleStatusSelect(event: any) {
        this.setState({ statusValue: event.target.value });
    }

    handleChangeInput(event: any) {
        this.setState({ inputValue: event.target.value });
    }

    handleChangeTextArea(event: any) {
        this.setState({ textAreaValue: event.target.value });
    }

    handleSprintSelect(event: any) {
        this.setState({ sprintId: event.target.value });

        let sprint = this.state.sprints.filter(s => event.target.value == s.id)[0] as Sprint;
        this.setState({ team: sprint.team, users: sprint.team.members });
    }

    private renderStatus() {
        let names: string[] = [];
        for (let iterator in StoryStatus) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i} value={names[i]}>{names[i]}</option>);
        }

        return <select
            value={this.state.statusValue}
            className="form-control CreatePage"
            name="State" style={{ width: "35%" }}
            onChange={this.handleStatusSelect}>
            {items}
        </select>;
    }

    public render() {
        return <div className="text-left">

            <div className="text-center">
                <h2 className="h2EditCreatePage">Creating a Story</h2>
            </div>
            <div>
                <h3 className="hStyle">Name:</h3>
                <input className="input-lg CreatePage" style={{ width: "35%" }} maxLength={20}
                    onChange={this.handleChangeInput} type="text" value={this.state.inputValue} required />
            </div>
            <div>
                <h3 className="hStyle">Description:</h3>
                <textarea style={{ height: "300px", fontSize: 25, padding: "7px", width: "35%" }} maxLength={300}
                    className="fa-text-height CreatePage" onChange={this.handleChangeTextArea} value={this.state.textAreaValue} required />
            </div>
            <div>
                <h3 className="hStyle">Status:</h3>
                {this.renderStatus()}
            </div>

            <div>
                <h3 className="hStyle">Assign to sprint:</h3>
                <select className="form-control inline-block CreatePage" style={{ width: "35%" }} onChange={this.handleSprintSelect} required>
                    {this.state.sprints.map(sprint => <option key={sprint.id} value={sprint.id}>{sprint.name}</option>)}
                </select>
            </div>

            <div>
                <h3 className="hStyle">Assign to team:</h3>
                <input className="input-lg" type="text" style={{ width: "35%" }} value={this.state.team.name} required></input>
            </div>

            <div>
                <h3 className="hStyle">Assign to:</h3>
                <select className="form-control inline-block CreatePage" style={{ width: "35%" }} onChange={this.handleUserSelect} required>
                    {this.state.users.map(user => <option key={user.userId} value={user.userId}>{user.login}</option>)}
                </select>
            </div>
            
            <div className="text-center">
                <button style={{ margin: "10px" }} data-toggle="modal" type="submit" id="CrtBtn"
                    className="btn-dark scrum-btn" data-target="#confirmDeleteModal"
                    onClick={this.handleCreateButtonClick}>Create a Story</button>
                <button />
            </div>
            {this.GetCreateConfirmModal()}
        </div>;
    }
}
