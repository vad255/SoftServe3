import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Feature } from '../Models/Feature';
import { Story } from '../Models/Story';
import { FeatureGrid } from '../Grids/FeatureGrid';
import { State } from '../Models/FeatureState';
import { Login } from '../Login';

interface IFeatureFetchingState {
    FeatureName: string;
    State: State;
    Description: string;
    Blocked: boolean;
    Stories: Story[];
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
    private URL: string = "odata/feature?$expand=stories($expand=team)&$filter=id eq " + this.id;
    private updateURL: string = "/odata/feature/";
    
    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>
            <h1>Page for editing</h1>
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
            <label>
                Name:
          <input
                    name="FeatureName"
                    type="text"
                    value={this.state.FeatureName}
                    onChange={this.handleInputChange} />

            </label>
            <br/>
            <label>
                Description:
          <textarea
                    name="Description"
                    type="text"
                    value={this.state.Description}
                    onChange={this.handleInputChange} />
            </label>
            <br/>
            <label>
                Blocked:
          <input
                    name="Blocked"
                    type="checkbox"
                    checked={this.state.Blocked}
                    onChange={this.handleInputChange} />
            </label>
            <br/>
            <label>
                State:
            {this.renderSelectOptions()}
            </label>
            <br />
            <div className="container-login100-form-btn">
                <button className="login100-form-btn">Save</button>
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
   
        return <select value={this.state.State}
            name="State"
            onChange={this.handleInputChange}>
            {items}
        </select>
    }

    public handleDBClick(event: any) {
        console.log(event)
    }

    dispalyItems: boolean = false;
    onDpopdownClick() {
        this.dispalyItems = !this.dispalyItems;
        this.forceUpdate();
    }

    private handleSave(event: any) {
        event.preventDefault();
        var form = new FormData(event.target);
        var featureUpdateModel = {
            FeatureName: this.state.FeatureName,
            State: this.state.State,
            Description: this.state.Description,
            Blocked: this.state.Blocked,
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