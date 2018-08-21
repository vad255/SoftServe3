import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { User } from "../Models/User";
import { Team } from '../Models/Team';
import { Role } from '../Models/Role';
import Switch from 'react-switch';

interface IEditPageState {
    user: User;
    id: string;
    loginValue: string;
    passwordValue: string;
    teamValue: number;
    activityValue: boolean;
    roleValue: number;
    roles: Role[],
    teams: Team[],
    modalMessage: string
}

export class UserEdit extends React.Component<RouteComponentProps<any>, IEditPageState> {
    constructor(props: any) {
        super(props);
        this.state = (({
            id: this.props.location.pathname.substring((this.props.location.pathname.lastIndexOf('/') + 1)), user: User, loginValue: "",
            passwordValue: "", teamValue: -1, activityValue: true, roleValue: -1, roles: [], teams: [], modalMessage: ""
        }) as any);

        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleLoginValue = this.handleLoginValue.bind(this);
        this.handlePasswordValue = this.handlePasswordValue.bind(this);
        this.handleTeamValue = this.handleTeamValue.bind(this);
        this.handleActivityValue = this.handleActivityValue.bind(this);
        this.handleRoleValue = this.handleRoleValue.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);

        fetch("odata/roles", { credentials: 'include' })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let rolesTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    rolesTemp[i] = new Role(data["value"][i]);
                this.setState({ roles: rolesTemp });
            })

        fetch("odata/teams", { credentials: 'include' })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let teamsTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    teamsTemp[i] = new Team(data["value"][i]);
                this.setState({ teams: teamsTemp });
            })

        fetch("odata/Users?$filter=UserId eq " + this.state.id, { credentials: 'include' })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let temp = new User(data["value"][0]);
                this.setState({
                    user: temp, loginValue: temp.login.toString(), passwordValue: temp.password.toString(),
                    teamValue: temp.teamId, activityValue: temp.activity, roleValue: temp.roleId
                });
            });

    }
    handleSaveButtonClick() {
        if (this.state.loginValue !== "" && this.state.passwordValue !== "") {
            this.setState({ modalMessage: "The user " + this.state.loginValue + " was updated." });
            fetch('odata/Users(' + this.state.id + ')',
                {
                    method: 'PATCH',
                    headers: {
                        'OData-Version': '4.0',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;odata.metadata=minimal',
                    },
                    body: JSON.stringify({

                        '@odata.type': 'DAL.Models.User',
                        'Login': this.state.loginValue,
                        'Password': this.state.passwordValue,
                        'RoleId': this.state.roleValue,
                        'TeamId': this.state.teamValue,
                        'Activity': this.state.activityValue
                    })
                });
        } else {
            this.setState({ modalMessage: "Enter the name and password please!" });
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
        if (this.state.modalMessage !== "Enter the name and password please!")
            this.props.history.push("/usergrid");
    }

    handleLoginValue(event: any) {
        this.setState({ loginValue: event.target.value });
    }

    handlePasswordValue(event: any) {
        this.setState({ passwordValue: event.target.value });
    }

    handleTeamValue(event: any) {
        this.setState({ teamValue: event.target.value });
    }
    handleActivityValue(event: boolean) {
        this.setState({ activityValue: event });
    }
    handleRoleValue(event: any) {
        this.setState({ roleValue: event.target.value });
    }


    render() {
        return <div className="text-left">
            <div className="text-center">
                <h2 className="h2EditCreatePage">Editing user by Id = {this.state.id}</h2>
            </div>
            <div >
                <h3 className="hStyle">Login:</h3>
                <input className="input-lg" style={{ width: "35%" }} onChange={this.handleLoginValue} type="text" value={this.state.loginValue} />
            </div>
            <div >
                <h3 className="hStyle">Password:</h3>
                <input className="input-lg" style={{ width: "35%" }} onChange={this.handlePasswordValue} type="text" value={this.state.passwordValue} />
            </div>
            <div >
                <h3 className="hStyle">Team:</h3>
                <select className="form-control" style={{ width: "35%" }} onChange={this.handleTeamValue} value={this.state.teamValue}>
                    {this.state.teams.map(x => <option value={x.id}>{x.name}</option>)}
                </select>
            </div>
            <div >
                <h3 className="hStyle">Activity:</h3>
                <Switch onChange={this.handleActivityValue}
                    checked={this.state.activityValue}
                    id="normal-switch" />
            </div>
            <div >
                <h3 className="hStyle">Role:</h3>
                <select className="form-control" style={{ width: "35%" }} onChange={this.handleRoleValue} value={this.state.roleValue}>
                    {this.state.roles.map(x => <option value={x.roleId}>{x.name}</option>)}
                </select>
            </div>
            <div className="text-center">
                <button style={{ margin: "20px" }} className="btn-dark scrum-btn" data-toggle="modal"
                    data-target="#confirmDeleteModal" onClick={this.handleSaveButtonClick}>Update</button>
            </div>
            {this.GetCreateConfirmModal()}
        </div>;
    }

}

