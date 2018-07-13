import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sprint } from '../Models/Sprint';
import { Story } from '../Models/Story';
import { State } from '../Models/FeatureState';
import { NavLink } from 'react-router-dom';
import { IDbModel } from '../Models/IDbModel'
import { SprintStage } from '../Models/SprintStage';
import { Team } from '../Models/Team';


interface ISprintEditState extends IEditState {
    item: Sprint
    teams: Team[]
}

export interface IEditState {
    item: IDbModel
}

export class SprintEdit extends React.Component<RouteComponentProps<{}>, ISprintEditState> {

    private isLoading: boolean = true;
    readonly id: number = -1;
    private URL: string = "";
    private UPDATE_URL: string = "/odata/sprints/";
    private MAIN_URL: string = "odata/sprints?$expand=team,backlog,history&$filter=id eq ";
    //private 

    constructor() {
        super();
        console.log("Constructor");

        let link = window.location.href;
        this.id = parseInt(link.substr(link.lastIndexOf('/') + 1));
        this.URL = "odata/sprints?$expand=team,backlog,history&$filter=id eq " + this.id;

        this.handleSave = this.handleSave.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.LoadData();
    }

    public LoadData() {
        fetch(this.URL)
            .then(response => response.json() as any)
            .then(data => {
                this.OnDataReceived(data);
            }).catch(e => console.error(e));

        fetch("api/teams/getFreeTeams", { credentials: "include" }).
            then(response => response.json() as any).
            then(data => {
                let teamsTemp: Team[] = [];
                (data as any[]).map(t => teamsTemp.push(new Team(t)));
                this.setState({ teams: teamsTemp });
            }).
            catch(e => console.error(e));

    }
    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return contents;
    }

    public renderContent() {
        return (
            <form style={{ margin: "10px", padding: "5px", textAlign: "center" }} onSubmit={this.handleSave} name="oldForm" >
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
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn inline-block">Discard</button>
                    </div>
                </div>
            </form >
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
        let options: JSX.Element[] = [];
        let index = 0;

        if (this.state.item.team) {
            options.push(
                <option key={index++} value={this.state.item.team.id}>
                    {this.state.item.team.name}
                </option>
            )
        }
        else
            options.push(<option key={index++} value={-1} />)


        if (this.state.teams) {
            this.state.teams.forEach(team => {
                options.push(
                    <option key={index++} value={team.id}>
                        {team.name}
                    </option>
                );
            });
        }


        return (
            <div>
                <h3 className="hStyle">Team:&nbsp;&nbsp;&nbsp;
                <select className="form-control inline-block">
                        {options}
                    </select>
                </h3>
            </div>
        );

    }
    getStageSelector() {
        let names: string[] = [];
        for (let iterator in SprintStage) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);
        }

        return (
            <div>
                <h3 className="hStyle">State:&nbsp;&nbsp;&nbsp;&nbsp;
                    <select
                        className="form-control inline-block"
                        value={this.state.item.stage}
                        onChange={this.handleStageChange.bind(this)}>
                        {items};
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



    OnDataReceived(data: any) {
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
    handleStageChange(event: any) {
        let newState = this.state.item;
        newState.stage = event.target.value;
        this.setState({ item: newState });
    }
    generateSelecorItems(items: { key: number, value: string, name: string }[]): JSX.Element[] {
        return items.map(i => <option key={i.key} value={i.value}>{i.name}</option>);
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