import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Story } from "../Models/Story";
import { StoryStatus } from "../Models/Story";
import { User } from "../Models/User";
import { Team } from "../Models/Team";

interface IEditPageState {
    story: Story;
    id: string;
    statusValue: string;
    inputValue: string;
    textAreaValue: string;
    users: User[];
    teamId: number;
    userId: number;
}

export class EditStory extends React.Component<RouteComponentProps<any>, IEditPageState> {
    constructor(props: any) {
        super(props);
        this.state = (({
            id: this.props.location.pathname.substring((this.props.location.pathname.indexOf('/') + 11)),
            story: Story,
            statusValue: "",
            inputValue: "",
            textAreaValue: "",
            users: [], teamId: 0,
            userId: 0
        }) as any);

        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleStatusSelect = this.handleStatusSelect.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.handleUserSelect = this.handleUserSelect.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);

        fetch("odata/Stories?$expand=team&$filter=id eq " + this.state.id)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let story1 = new Story(data["value"][0]);
                this.setState({
                    story: story1,
                    statusValue: story1.status.toString(),
                    inputValue: story1.name,
                    textAreaValue: story1.description,
                    teamId: story1.team.id,
                    userId: story1.userId
                });
            }).then(() => this.getUsers());
    }

    getUsers() {
        fetch("odata/users?$filter=TeamId eq " + this.state.teamId)
            .then(response => response.json() as Promise<any>)
            .then(data => {

                var usersData = [];
                for (var i = 0; i < data["value"].length; i++) {
                    usersData[i] = new User(data["value"][i]);
                }

                this.setState({ users: usersData });
            });
    }

    handleSaveButtonClick() {
        fetch('odata/Stories(' + this.state.id + ')',
            {
                method: 'PATCH',
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
                    'UserId': this.state.userId,
                })
            });


    }


    private GetDeleteConfirmModal() {
        return <div id="confirmDeleteModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                        <h4 className="modal-title">The story "{this.state.story.name}" was updated.</h4>
                    </div>
                    <div className="modal-body text-center">
                        <button className="btn btn-default" type="button" data-dismiss="modal" onClick={this.handleOkButtonClick} >
                            Ok</button>
                    </div>
                </div>
            </div>
        </div>;
    }

    handleOkButtonClick() {
        this.props.history.push("/Stories");
    }

    handleUserSelect(event: any) {
        console.log(this.state.userId);
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

    public render() {
        return <div className="text-left">
            <div className="text-center">
                <h2 style={{ margin: "10px", padding: "5px" }}>Editing story by Id = {this.state.id}</h2>
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Name:</h3>
                <input className="input-lg" onChange={this.handleChangeInput} type="text" value={this.state.inputValue} />
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Description:</h3>
                <textarea style={{ width: "400px", height: "300px", fontSize: 25, padding: "7px" }} className="fa-text-height" onChange={this.handleChangeTextArea} value={this.state.textAreaValue} />
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Status:</h3>
                <select className="form-control-static" onChange={this.handleStatusSelect} >
                    <option value="0">Pending approval</option>
                    <option value="1">Ready to start</option>
                    <option value="2">In progress</option>
                    <option value="3">Developing сomplete</option>
                    <option value="4">Test сomplete</option>
                    <option value="5">Accepted</option>
                </select>
            </div>

            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Assign to:</h3>
                <select className="form-control-static" onChange={this.handleUserSelect}>
                    {this.state.users.map(user => <option key={user.userId} value={user.userId}>{user.login}</option>)}
                </select>
            </div>

            <div className="text-center">
                <button style={{ margin: "10px" }} data-toggle="modal"
                    data-target="#confirmDeleteModal" className="btn-success"
                    onClick={this.handleSaveButtonClick}>Update</button>
            </div>
            {this.GetDeleteConfirmModal()}
        </div>;
    }
}