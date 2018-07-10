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
    Owner: User;
}

export class FeatureEdit extends React.Component<RouteComponentProps<{}>, IFeatureFetchingState> {
    
    constructor() {
        super();
        this.LoadData();
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    private isLoading: boolean = true;
    private link: string = (window.location.href);
    readonly id: string = this.link.substr(this.link.lastIndexOf('/') + 1);
    private URL: string = "odata/feature?$expand=owner,stories($expand=team)&$filter=id eq " + this.id;
    private updateURL: string = "/odata/feature/";
    
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
            <h4>{this.OnDataReceived.bind(this)}</h4>
        </div>
    }

    public LoadData() {
        fetch(this.URL)
            .then(response => response.json() as any)
            .then(data => {
                this.OnDataReceived(data);
            })
    }

    private setFeatureData(currentFeature: Feature) {
        this.setState({
            FeatureName: currentFeature.featureName,
            State: currentFeature.state,
            Description: currentFeature.description,
            Blocked: currentFeature.blocked,
            Stories: currentFeature.stories,
            ProgramIncrement: currentFeature.programIncrement,
            Owner: currentFeature.owner
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

    public EditName() {
        return <form onSubmit={this.handleSave} name="oldForm" >
            <div className="text-center">
                <h2 style={{ margin: "10px", padding: "5px", textAlign: "center" }}>"{this.state.FeatureName}" feature editing page</h2>
            </div>
            <div className="text-left">
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Name:</h3>
                <input
                    className="input-lg"
                    name="FeatureName"
                    type="text"
                    value={this.state.FeatureName}
                    onChange={this.handleInputChange} />
            </div>
            <div className="text-left">
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Description:</h3>
                <textarea
                    style={{ width: "400px", height: "300px", fontSize: 20, padding: "7px" }}
                    className="fa-text-height"
                    name="Description"
                    type="text"
                    value={this.state.Description}
                    onChange={this.handleInputChange} />
            </div>
            <div className="text-left">
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Stories:</h3>
                <div id={this.id.toString()} role="button" className="btn btn-sq-xs align-base ">
                    <NavLink to={`../stories?featureId=${this.id}`} activeClassName='active'>
                       See stories which are in this feature...
                    </NavLink>
                </div>
            </div>
            <div className="text-left">
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Blocked:</h3>
                <input
                    name="Blocked"
                    type="checkbox"
                    checked={this.state.Blocked}
                    onChange={this.handleInputChange} />
            </div>
            <div className="text-left">
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Owner:</h3>
                <input
                    name="Owner"
                    type="text"
                    value={this.state.Owner.login}
                    onChange={this.handleInputChange} />
            </div>
            <div className="text-left">
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>State:</h3>
            {this.renderSelectOptions()}
            </div>
            <div className="text-left">
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Program increment:</h3>
                <input
                    className="input-lg"
                    name="ProgramIncrement"
                    type="text"
                    value={this.state.ProgramIncrement}
                    onChange={this.handleInputChange} />
            </div>
            <div className="container-login100-form-btn">
                <button className="login100-form-btn">Update</button>
            </div>
        </form>
    }

    private renderSelectOptions() {
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
            value={this.state.State}
            name="State"
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
            Owner: this.state.Owner
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