import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sprint } from '../Models/Sprint';
import { Story } from '../Models/Story';
import { State } from '../Models/FeatureState';
import { NavLink } from 'react-router-dom';
import { IDbModel } from '../Models/IDbModel'


interface ISprintEditState extends IEditState {
    item: Sprint
}

export interface IEditState {
    item: IDbModel
}

export class SprintEdit extends React.Component<RouteComponentProps<{}>, ISprintEditState> {

    private isLoading: boolean = true;
    readonly id: number = -1;
    private URL: string = "";
    private updateURL: string = "/odata/sprints/";

    constructor() {
        super();
        console.log("Constructor");

        let link = window.location.href;
        this.id = parseInt(link.substr(link.lastIndexOf('/') + 1));
        this.URL = "odata/sprints?$expand=team,backlog,history&$filter=id eq " + this.id;

        this.LoadData();
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }



    public LoadData() {
        fetch(this.URL)
            .then(response => response.json() as any)
            .then(data => {
                this.OnDataReceived(data);
            }).catch(e => console.error(e));
    }

    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return contents;
    }

    public renderContent() {
        return  (
            <form onSubmit={this.handleSave} name="oldForm">
                <div className="text-center">
                    <h2 style={{ margin: "10px", padding: "5px", textAlign: "center" }}>"{this.state.item.name}" feature editing page</h2>
                </div>
                <div className="text-left">
                    <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Name:</h3>
                    <input
                        className="input-lg"
                        name="FeatureName"
                        type="text"
                        value={this.state.item.name}
                        onChange={this.handleInputChange} />
                </div>
                <div className="text-left">
                    <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Description:</h3>
                    <textarea
                        style={{ width: "400px", height: "300px", fontSize: 20, padding: "7px" }}
                        className="fa-text-height"
                        name="Description"
                        type="text"
                        value={this.state.item.review}
                        onChange={this.handleInputChange} />
                </div>
                <div className="text-left">
                    <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Stories:</h3>
                    <div id={this.id.toString()} role="button" className="btn btn-sq-xs align-base ">
                        <NavLink to={`../stories?filter=sprintid eq ${this.id}`} activeClassName='active'>
                            See stories which are in this sprint...
                </NavLink>
                    </div>
                </div>
                <div className="text-left">
                    <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Blocked:</h3>
                    <input
                        name="Blocked"
                        type="checkbox"
                        checked={true}
                        onChange={this.handleInputChange} />
                </div>
                <div className="text-left">
                    <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Owner:</h3>
                    <input
                        name="Owner"
                        type="text"
                        value={this.state.item.team.name}
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
                        value={this.state.item.review}
                        onChange={this.handleInputChange} />
                </div>
                <div className="container-login100-form-btn">
                    <button className="login100-form-btn">Update</button>
                </div>
            </form>
        )
    }



    protected OnDataReceived(data: any) {
        this.isLoading = false;
        let currentItem = new Sprint(data['value'][0]);
        this.setState({ item: currentItem })
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

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

        return <select>
            {/* // value={this.state.State}
            // name="State"
            // onChange={this.handleInputChange}>
            // {items} */}
        </select>
    }

    private handleSave(event: any) {
        event.preventDefault();
        // var form = new FormData(event.target);
        // var featureUpdateModel = {
        //     FeatureName: this.state.FeatureName,
        //     State: this.state.State,
        //     Description: this.state.Description,
        //     Blocked: this.state.Blocked,
        //     ProgramIncrement: this.state.ProgramIncrement,
        //     Owner: this.state.Owner
        //};

        // fetch(this.updateURL + this.id, {
        //     method: 'Patch',
        //     body: JSON.stringify({
        //         '@odata.type': 'DAL.Models.Feature',
        //         ...featureUpdateModel
        //     }
        //     ),
        //     headers: {
        //         'OData-Version': '4.0',
        //         'Content-Type': 'application/json;odata.metadata=minimal',
        //         'Accept': 'application/json'
        //     }
        // }).then(response => { this.props.history.push('/feature') });
    }
}