import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sprint } from '../Models/Sprint';
import { Story } from '../Models/Story';
import { State } from '../Models/FeatureState';
import { NavLink } from 'react-router-dom';
import { IDbModel } from '../Models/IDbModel'
import { SprintStage } from '../Models/SprintStage';


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
        //this.handleInputChange = this.handleInputChange.bind(this);
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
        return (
            <form style={{ margin: "10px", padding: "5px", textAlign: "center" }} onSubmit={this.handleSave} name="oldForm">
                <div className="text-left">
                    {this.getHeader()}
                    {this.getNameInput()}
                    {this.getTeamSelector()}
                    {this.getStageSelector()}
                    {this.getReletedStoriesLink()}
                    {this.getReviewInput()}
                    {this.getRetrospectiveInput()}

                    <div className="text-center">
                        <button className="btn">Update</button>
                    </div>
                </div>
            </form>
        )
    }



    getHeader() {
        return <div className="text-center">
            <h2> Sprint editing page</h2>
            <br />
            <h3>"{this.state.item.name}"</h3>
        </div>;
    }
    getNameInput() {
        return (
            <div>
                <h3 className="hStyle">Name:&nbsp;&nbsp;
                <input
                        className="form-control inline-block"
                        name="SprintName"
                        type="text"
                        value={this.state.item.name}
                        //onChange={this.handleInputChange} 
                        />
                </h3>
            </div>

        )
    }
    getTeamSelector() {
        let names: string[] = [];
        for (let iterator in SprintStage) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);
        }

        // return <select
        //     value={this.state.item.stage}
        //     name="State"
        //     onChange={this.handleInputChange}>
        //     {items} }
        // </select>


        return (
            <div>
                <h3 className="hStyle">Team:&nbsp;&nbsp;&nbsp;
                <select className="form-control inline-block">
                        <option key={1} value={1}>Foo</option>
                        <option key={2} value={2}>Bar</option>
                        <option key={3} value={3}>Baz</option>
                    </select>
                </h3>
            </div>
        );
    }
    getReletedStoriesLink() {
        return (
            <div>
                <h3 className="hStyle">Stories:&nbsp;
                    <button className="form-control inline-block">
                        <NavLink
                            //className="align-base"
                            to={`../stories?filter=sprintid eq ${this.id}`}
                            activeClassName='active'>
                            Go to related stories
                        </NavLink>
                    </button>
                </h3>
            </div >
        );
    }
    getStageSelector() {
        return (
            <div>
                <h3 className="hStyle">State:&nbsp;&nbsp;&nbsp;&nbsp;
                {this.renderSelectOptions()}
                </h3>
            </div>
        );
    }
    getReviewInput() {
        return (
            <div>
                <h3 className="hStyle">Review:</h3>
                <textarea
                    className="areaStyle"
                    name="Description"
                    type="text"
                    value={this.state.item.review}
                    onChange={this.handleReviewChange}
                />
            </div>
        )
    }
    getRetrospectiveInput() {
        return (
            <div>
                <h3 className="hStyle">Retrospective:</h3>
                <textarea
                    className="areaStyle fa-text-height"

                    name="Description"
                    type="text"
                    value={this.state.item.retrospective}
                    onChange={this.handleRetrospChange}
                />
            </div>
        )
    }

    protected OnDataReceived(data: any) {
        this.isLoading = false;
        let currentItem = new Sprint(data['value'][0]);
        this.setState({ item: currentItem })
    }
    handleReviewChange(event: any) {
        let newState = this.state.item;
        newState.review = event.target.value;
        this.setState({ item: newState });
    }
    handleRetrospChange(event: any) {
        let newState = this.state.item;
        newState.retrospective = event.target.value;
        this.setState({ item: newState });
    }



    private renderSelectOptions() {
        let names: string[] = [];
        for (let iterator in SprintStage) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);
        }

        return <select
            className="form-control inline-block"
            value={this.state.item.stage}
            name="State"
            //onChange={this.handleInputChange}
            >
            {items} }
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