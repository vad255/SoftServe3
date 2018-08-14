import * as React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Select from 'react-select';
import { RouteComponentProps } from 'react-router';
import { Feature } from '../Models/Feature';
import { Story } from '../Models/Story';
import { FeatureGrid } from '../Grids/FeatureGrid';
import { State } from '../Models/FeatureState';
import { User } from '../Models/User';
import { Team } from '../Models/Team';
import { Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ITeamFetchingState {
    TeamName: string;
    Users: User[];
    UsersWithoutTeam: User[];
    AllUsers: User[];
}

interface IValue {
    value: string,
    label: string
}

export class CreateTeam extends React.Component<RouteComponentProps<any>, ITeamFetchingState> {

    constructor() {
        super();
        this.LoadData();
        this.getUsers();
        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);

        this.state = {
            TeamName: "",
            Users: [],
            UsersWithoutTeam: [],
            AllUsers: []
        }
    }

    private isLoading: boolean = true;
    private link: string = (window.location.href);
    readonly id: string = this.link.substr(this.link.lastIndexOf('/') + 1);
    private URL: string = "odata/teams?$expand=members&$filter=id eq " + this.id;
    private updateURL: string = "odata/teams/";
    private getUserURL: string = "odata/users/";

    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>
            {contents}
        </div>
    }

    public renderContent() {
        return <div><h4>{this.EditName()}</h4>
            <h4>{this.setUsers.bind(this)}</h4>
        </div>
    }

    public LoadData() {
        fetch(this.URL)
            .then(response => response.json() as any)
            .then(data => {
                this.OnDataReceived(data);
            })
    }

    private getUsers() {
        fetch(this.getUserURL, {
            credentials: 'include',
        })
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setUsers(data);
            })
    }


    private setUsers(data: any) {
        this.isLoading = false;
        var userData = data['value'];
        let users: User[] = [];
        let allUsers: User[] = [];
        for (var i = 0; i < userData.length; i++) {
            var user = new User(userData[i])
            allUsers.push(user);
            if (user.teamId === null) {
                users.push(user);
            }
        }

        this.setState(
            {
                UsersWithoutTeam: users,
                AllUsers: allUsers
            });
    }

    private setTeamData(currentTeam: Team) {
        this.setState({
            TeamName: currentTeam.name,
            Users: currentTeam.members
        });
    }

    protected OnDataReceived(data: any) {
        this.isLoading = false;
        let curentTeam = new Team(data['value'][0]);
        this.setTeamData(curentTeam);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    private GetDeleteConfirmModal() {
        return <div id="confirmDeleteModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                        <h4 className="modal-title">The new team "{this.state.TeamName}" was added.</h4>
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
        this.props.history.push("/teamgrid");
    }

    public EditName() {
        return <div>
            <div className="text-center">
                <h2 style={{ margin: "10px", padding: "5px", textAlign: "center" }}>Create New Team</h2>
            </div>
            <div className="text-left">
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Name:</h3>
                <input
                    className="input-lg"
                    name="TeamName"
                    type="text"
                    value={this.state.TeamName}
                    onChange={this.handleInputChange} />
            </div>
            <div className="text-left">
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Members:</h3>
                {this.renderUsers()}
            </div>
            <div className="container-login100-form-btn">
                    <button style={{ margin: "20px 0 0 0" }} data-toggle="modal"
                    data-target="#confirmDeleteModal" onClick={() => this.handleCreateButtonClick()} className="btn-dark scrum-btn">Add</button>
                </div>
                {this.GetDeleteConfirmModal()}
        </div>
    }

    private onMultiChange(value: any) {
        let users: User[] = [];
        let user: User;
        for (var i = 0; i < value.length; i++) {
            user = this.state.AllUsers.filter(u => u.login === value[i].label)[0];
            users.push(user);
            this.setState({
                Users: users,
            })
        }
    }

    private renderUsers() {
        return <Select
            value={this.state.Users.map(u => { return { value: u.userId != undefined ? u.userId : null, label: u.login != undefined ? u.login : null } })}
            multi
            closeOnSelect={!true}
            name="colors"
            onChange={this.onMultiChange}
            options={this.state.UsersWithoutTeam.map(u => { return { value: u.userId, label: u.login } })}
        />
    }

    handleCreateButtonClick() {
        if (this.state.TeamName != "" && this.state.Users != null) {
            fetch('odata/Teams',
                {
                    method: 'Post',
                    headers: {
                        'OData-Version': '4.0',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;odata.metadata=minimal',
                    },
                    body: JSON.stringify({
                        '@odata.type': 'DAL.Models.Team',
                        'TeamName': this.state.TeamName,
                        'Users': this.state.Users
                    })
                });
        }
    }
}
