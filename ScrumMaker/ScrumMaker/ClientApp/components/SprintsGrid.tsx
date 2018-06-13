import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface Sprint {
    id: number;
    stage: string;
    history: ISprintHistory
    backlog: string;
    defects: string;
    dailyScrums: string;
    review: string;
    retrospective: string;
}

interface ISprintHistory
{
    id:number;
    initiated: string;
    planned: string;
    beginned: string;
    reviewDone: string;
    retrospectiveDone: string;
    
}


interface SprintDataFetchingState {
    sprints: Sprint[];
    loading: boolean;
}

export class SprintsGrid extends React.Component<RouteComponentProps<{}>, SprintDataFetchingState> {
    constructor() {
        super();
        this.state = { sprints: [], loading: true };

        fetch('api/Grids/GetSprints')
            .then(response => response.json() as Promise<Sprint[]>)
            .then(data => {
                this.setState({ sprints: data, loading: false });
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
                    <tr key={sprint.id}>
                        <td>{sprint.id}</td>
                        <td>{sprint.stage}</td>
                        <td>{sprint.review}</td>
                        <td>{SprintsGrid.renderHistory(sprint.history)}</td>
                        <td>{sprint.retrospective}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

    private static renderHistory(history: ISprintHistory)
    {
        if(!history)
        {
            return <p>NULL</p>
        }
        else{
            return(<ul>
                <li>Initiated {history.initiated}</li>
                <li>Planned {history.planned}</li>
                <li>Beginned {history.beginned}</li>
                <li>Reviev{history.reviewDone}</li>
                <li>Retrospective {history.retrospectiveDone}</li>
            </ul>);
        }
    }
    
}


class SprintHistory extends React.Component<ISprintHistory>{
    constructor() {
        super();
        this.state;
        
    }

    public render() {

    return (<p>Hello</p>);

    }

    private static renderEventsList(eventLog: any) {
    return (<p>Hello</p>);
        // <ul>
        //     <li>Initiated {eventLog.initiated}</li>
        //     <li>Planned {eventLog.planned}</li>
        //     <li>Beginned {eventLog.beginned}</li>
        //     <li> Reviev{eventLog.reviewDone}</li>
        //     <li> Retrospective {eventLog.retrospectiveDone}</li>
        // </ul>;
    }
}


