import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface ISprint {
     id: number;
     stage: string;
     history: ISprintHistory
     backlog: string;
     defects: string;
     dailyScrums: string;
     review: string;
     retrospective: string;

    // public constructor(params: any)
    // {
    //     //super(params);
    //     this.id = params.id;
    //     this.stage = params.stage;
    //     //this.history = params.history;
    //     this.backlog = params.backlog;
    //     this.defects = params.defects;
    //     this.dailyScrums = params.deilyScrums;
    //     this.review = params.review;
    //     this.retrospective = params.retrospective;
    // }

    // public render()
    // {
    //     return <td>Hello</td>

    // }
}
interface ISprintHistory
{
    id: number;
    initiated: string;
    planned: string;
    begined: string;
    reviewDone: string;
    retrospectiveDone: string;
}

class Sprint{
    id: number;
    stage: string;
    history: SprintHistory
    backlog: string;
    defects: string;
    dailyScrums: string;
    review: string;
    retrospective: string;

   public constructor(params: ISprint)
   {
       //super(params);
       this.id = params.id;
       this.stage = params.stage;
       this.history = new SprintHistory(params.history);
       this.backlog = params.backlog;
       this.defects = params.defects;
       this.dailyScrums = params.dailyScrums;
       this.review = params.review;
       this.retrospective = params.retrospective;
   }

    public renderAsTableRow()
    {
        return (<tr key={this.id}>
                     <td>{this.id}</td>
                     <td>{this.stage}</td>
                     <td>{this.review}</td>
                     <td>{this.history.renderAsList()}</td>
                     <td>{this.retrospective}</td>
                 </tr>);
              

    }
}

class SprintHistory{
    constructor(params: ISprintHistory) {
        if (params == null || params == undefined)
        {
            this.empty = true;
            return;
        }
        this.empty = false;
        this.id = params.id;
        this.initiated = params.initiated;
        this.planned = params.planned;
        this.begined = params.begined;
        this.reviewDone = params.reviewDone;
        this.retrospectiveDone = params.retrospectiveDone;
    }

    empty: boolean;

    public id :number | undefined;
    public initiated: string | undefined;
    public planned: string | undefined;
    public begined: string | undefined;
    public reviewDone: string | undefined;
    public retrospectiveDone: string | undefined;

    public renderAsList() {

        if (this.empty)
            return <p>No Data</p>;
        else
            return (
            <ul>
                <li>Initiated   {this.initiated}</li>
                <li>Planned     {this.planned}</li>
                <li>Beginned    {this.begined}</li>
                <li>Reviev      {this.reviewDone}</li>
                <li>Retrospective {this.retrospectiveDone}</li>
            </ul>);

    }
}


interface SprintDataFetchingState {
    sprints: Sprint[];
    loading: boolean;
}

export class SprintsGrid extends React.Component<RouteComponentProps<{}>, SprintDataFetchingState> {
    constructor() {
        super();
        this.state = { sprints: [], loading: true };

        fetch('api/Sprints/Get')
            .then(response => response.json() as Promise<Sprint[]>)
            .then(data => {
                var sprints = [];
                for (var i = 0; i < data.length; i++)
                    sprints[i] = new Sprint(data[i]);

                this.setState({ sprints: sprints, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SprintsGrid.renderSprintsTable(this.state.sprints);

        return <div>
            <h1>Sprints</h1>
            <p>Here represented all sprints from the database.</p>
            {contents}
        </div>;
    }

    private static renderSprintsTable(sprints: Sprint[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Database ID</th>
                    <th>Stage</th>
                    <th>Review</th>
                    <th>History</th>
                    <th>retrospective</th>
                </tr>
            </thead>
            <tbody>
                {sprints.map(sprint =>
                    // <tr key={sprint.id}>
                    //     <td>{sprint.id}</td>
                    //     <td>{sprint.stage}</td>
                    //     <td>{sprint.review}</td>
                    //     <td>{sprint.history}</td>
                    //     <td>{sprint.retrospective}</td>
                    // </tr>
                    sprint.renderAsTableRow()
                )}
            </tbody>
        </table>;
    }
}




