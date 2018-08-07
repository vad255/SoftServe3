import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { User } from "../Models/User";
import { Team } from '../Models/Team';
import { Role } from '../Models/Role';


interface IEditPageState {
    user: User;
    id: string;
    loginValue: string;
    passwordValue: string;
    teamValue: number;
    activityValue: boolean;
    roleValue: number;
    roles: Role[],
    teams: Team[]
}

export class UserEdit extends React.Component<RouteComponentProps<any>, IEditPageState> {
    constructor(props: any) {
        super(props);
        this.state = (({
            id: this.props.location.pathname.substring((this.props.location.pathname.lastIndexOf('/') + 1)), user: User, loginValue: "",
            passwordValue: "", teamValue: -1, activityValue: true, roleValue: -1, roles: [],teams: []
        }) as any);

        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleLoginValue = this.handleLoginValue.bind(this);
        this.handlePasswordValue = this.handlePasswordValue.bind(this);
        this.handleTeamValue = this.handleTeamValue.bind(this);
        this.handleActivityValue = this.handleActivityValue.bind(this);
        this.handleRoleValue = this.handleRoleValue.bind(this); 

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

        alert("Data was updated!");
        <Redirect to="/usergrid"/>
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
    handleActivityValue(event: any) {
        this.setState({ activityValue: event.target.checked });
    }
    handleRoleValue(event: any) {
        this.setState({ roleValue: event.target.value });
    }


    render() {
         return <div className="text-left">
            <div className="text-center">
                <h2 style={{ margin: "10px", padding: "5px" }}>Editing user by Id = {this.state.id}</h2>
            </div>
            <div>
                 <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Login:</h3>
                 <input className="input-lg" onChange={this.handleLoginValue} type="text" value={this.state.loginValue} />
            </div>
            <div>
                 <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Password:</h3>
                 <input className="input-lg" onChange={this.handlePasswordValue} type="text" value={this.state.passwordValue} />
            </div>
            <div>
                 <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Team:</h3>
                 <select className="form-control-static" onChange={this.handleTeamValue} value={this.state.teamValue}>
                     {this.state.teams.map(x => <option value={x.id}>{x.name}</option>)}
                 </select>
             </div>
            <div>
                 <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Activity:</h3>
                 <input
                     name="activityValue"
                     type="checkbox"
                     checked={this.state.activityValue}
                     onChange={this.handleActivityValue} />
            </div>
            <div>
                 <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Role:</h3>
                 <select className="form-control-static" onChange={this.handleRoleValue} value={this.state.roleValue} >
                     {this.state.roles.map(x => <option value={x.roleId}>{x.name}</option>)}
                 </select>
             </div>
            <div className="container-login100-form-btn text-center">
                 <Link to="/usergrid" style={{ margin: "20px" }} className="login100-form-btn" onClick={this.handleSaveButtonClick}>Update</Link>
            </div>

        </div>;
    }

}

