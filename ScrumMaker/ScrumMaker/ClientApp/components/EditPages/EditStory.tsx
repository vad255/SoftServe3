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
    modalMessage: string;
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
            userId: 1,
            modalMessage: ""
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
                    userId: story1.userId,
                    modalMessage: ""
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
        if (this.state.inputValue !== "" && this.state.textAreaValue !== "") {
            this.setState({ modalMessage: "The story " + this.state.inputValue + " was updated." });
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
        } else {
            this.setState({ modalMessage: "Enter the name and description please!" });
        }
    }


    private GetDeleteConfirmModal() {
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
            className="form-control CreatePage" required
            name="State" style={{ width: "35%" }}
            onChange={this.handleStatusSelect}>
            {items}
        </select>;
    }

    handleOkButtonClick() {
        if (this.state.modalMessage !== "Enter the name and description please!")
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
                <h2 className="h2EditCreatePage">Editing story by Id = {this.state.id}</h2>
            </div>
            <div>
                <h3 className="hStyle">Name:</h3>
                <input className="input-lg" style={{ width: "35%" }} maxLength={20}
                    onChange={this.handleChangeInput} type="text" value={this.state.inputValue} required />
            </div>
            <div>
                <h3 className="hStyle">Description:</h3>
                <textarea style={{ width: "35%", height: "300px", fontSize: 25, padding: "7px" }} maxLength={300}
                    className="fa-text-height" onChange={this.handleChangeTextArea} value={this.state.textAreaValue} required />
            </div>
            <div>
                <h3 className="hStyle">Status:</h3>
                {this.renderStatus()}
            </div>

            <div>
                <h3 className="hStyle">Assign to:</h3>
                <select className="form-control inline-block" style={{ width: "35%" }} onChange={this.handleUserSelect} required>
                    {this.state.users.map(user => <option key={user.userId} value={user.userId}>{user.login}</option>)}
                </select>
            </div>

            <div className="text-center">
                <button style={{ margin: "10px" }} data-toggle="modal"
                    data-target="#confirmDeleteModal" className="btn-dark scrum-btn"
                    type="submit">Update</button>
            </div>
            {this.GetDeleteConfirmModal()}
        </div>;
    }
}
