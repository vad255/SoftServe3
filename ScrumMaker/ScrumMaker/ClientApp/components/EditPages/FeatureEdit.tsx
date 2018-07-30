import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Feature } from '../Models/Feature';
import { Story } from '../Models/Story';
import { FeatureGrid } from '../Grids/FeatureGrid';
import { State } from '../Models/FeatureState';
import { NavLink } from 'react-router-dom';
import { User } from '../Models/User';

interface IFeatureFetchingState {
    FeatureName: string;
    State: State;
    Description: string;
    Blocked: boolean;
    Stories: Story[];
    ProgramIncrement: string;
    OwnerUserId: number;
    Owner: User;
    Users: User[];
}

export class FeatureEdit extends React.Component<RouteComponentProps<{}>, IFeatureFetchingState> {
    
    constructor() {
        super();
        this.LoadData();
        this.getUsers();
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    private isLoading: boolean = true;
    private link: string = (window.location.href);
    readonly id: string = this.link.substr(this.link.lastIndexOf('/') + 1);
    private URL: string = "odata/feature?$expand=owner,stories($expand=team)&$filter=id eq " + this.id;
    private updateURL: string = "/odata/feature/";
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
        return <div>
            <h4>{this.EditFeature()}</h4>
            <h4>{this.OnDataReceived.bind(this)}</h4>
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
            .then(response => response.json() as any)
            .then(data => {
                this.setUsers(data);
            })
    }

    private setUsers(data: any) {
        this.isLoading = false;
        var userData = data['value'];
        let users: User[] = [];
        for (var i = 0; i < userData.length; i++) {
            var user = new User(userData[i])
            users.push(user);
        }

        this.setState(
            {
                Users : users
        });
    }

    private setFeatureData(currentFeature: Feature) {
        this.setState({
            FeatureName: currentFeature.featureName,
            State: currentFeature.state,
            Description: currentFeature.description,
            Blocked: currentFeature.blocked,
            Stories: currentFeature.stories,
            ProgramIncrement: currentFeature.programIncrement,
            Owner: currentFeature.owner,
            OwnerUserId: currentFeature.owner.userId
        });
    }

    protected OnDataReceived(data: any) {
        this.isLoading = false;
        let curentFeature = new Feature(data['value'][0]);
        this.setFeatureData(curentFeature);
    }
    
    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    public EditFeature() {
        return <form onSubmit={this.handleSave} name="oldForm" >
            <div className="text-center">
                <h2 style={{ margin: "10px", padding: "5px", textAlign: "center" }}>"{this.state.FeatureName}" feature editing page</h2>
            </div>
            <h3 className="hStyle">Name:&nbsp;&nbsp;
                <input
                    className="form-control inline-block"
                    name="FeatureName"
                    type="text"
                    value={this.state.FeatureName}
                    onChange={this.handleInputChange} />
            </h3>
            <h3 className="hStyle">Stories:&nbsp;&nbsp;
            <div id={this.id.toString()} role="button" className="btn btn-sq-xs align-base ">
                    <NavLink to={`../stories?filter=feature/id eq ${this.id}`} activeClassName='active'>
                       See stories which are in this feature...
                    </NavLink>
                </div>
            </h3>
            <h3 className="hStyle">Blocked:&nbsp;&nbsp;
                <input
                    name="Blocked"
                    type="checkbox"
                    checked={this.state.Blocked}
                    onChange={this.handleInputChange} />
            </h3>
            <h3 className="hStyle">Owner:&nbsp;&nbsp;
            {this.renderUsers()}
            </h3>
            <h3 className="hStyle">State:&nbsp;&nbsp;
            {this.renderStates()}
            </h3>
            <h3 className="hStyle">Program increment:&nbsp;&nbsp;
                <input
                    className="form-control inline-block"
                    name="ProgramIncrement"
                    type="text"
                    value={this.state.ProgramIncrement}
                    onChange={this.handleInputChange} />
            </h3>
            <h3 className="hStyle">Description:</h3>
            <textarea
                className="areaStyle"
                name="Description"
                type="text"
                value={this.state.Description}
                onChange={this.handleInputChange} />
            <div className="text-center">
                <button
                    className="btn"
                    data-toggle="modal"
                    data-target="#ConfirmDialog"
                    role="button">Update</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    className="btn inline-block"
                    onClick={this.handleCancel.bind(this)}>Discard</button>
            </div>
        </form>
    }

    private handleCancel() {
        this.props.history.push('/feature');
    }

    private renderStates() {
        let names: string[] = [];
        for (let iterator in State) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);
        }
   
        return <select
            className="form-control inline-block"
            value={this.state.State}
            name="State"
            onChange={this.handleInputChange}>
            {items}
        </select>
    }

    private renderUsers() {
        let items: JSX.Element[] = [];
        var users = this.state.Users;
        for (var i = 0; i < users.length; i++) {
            items.push(<option key={i + 1} value={users[i].userId}>{users[i].login}</option>);
        }

        return <select
            value={this.state.OwnerUserId}
            name="OwnerUserId"
            onChange={this.handleInputChange}>
            {items}
        </select>
    }

    private handleSave(event: any) {
        event.preventDefault();
        var form = new FormData(event.target);
        var featureUpdateModel = {
            FeatureName: this.state.FeatureName,
            State: this.state.State,
            Description: this.state.Description,
            Blocked: this.state.Blocked,
            ProgramIncrement: this.state.ProgramIncrement,
            OwnerUserId: this.state.OwnerUserId
        };

        fetch(this.updateURL + this.id, {
            method: 'Patch',
            body: JSON.stringify({
                '@odata.type': 'DAL.Models.Feature',
                ...featureUpdateModel
            }
            ),
            headers: {
                'OData-Version': '4.0',
                'Content-Type': 'application/json;odata.metadata=minimal',
                'Accept': 'application/json'
            }
        }).then(response => { this.props.history.push('/feature') });
    }
}