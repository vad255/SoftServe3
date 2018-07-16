/// <reference path="../models/defectpriority.tsx" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from '../Models/User';
import { Sprint } from '../Models/Sprint';
import { Story } from '../Models/Story';
import { SprintReview } from '../Models/SprintReview';

interface ISprintReviewFetchingState {
    Goal: string;
    Sprint: Sprint;
    SprintId: number;
}

export class SprintReviewEdit extends React.Component<RouteComponentProps<{}>, ISprintReviewFetchingState> {

    constructor() {
        super();
        this.getSprintReview();
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    private getSprintReviewURL: string = "odata/SprintReview?$expand=sprint($expand=backlog,team($expand=members))&$filter=id eq 16&";
    private isLoading: boolean = true;
    private updateURL: string = "odata/SprintReview/16"
    
    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>{contents}</div>
    }

    public renderContent() {
        return <div>
            {this.setSprintReview.bind(this)}
            {this.EditSprintReview()}
            {this.setSprintReview.bind(this)}
        </div>
    }

    public EditSprintReview() {
        return <div>
            <h1 className="text-center">Sprint "{this.state.Sprint.name}" review</h1>
            <div className="row">
                <div className="col-md-6">
                    {this.GetTeamTable()}
                </div>
                <div className="col-md-6">
                    {this.GetBacklogTable()}
                </div>
            </div>
            <div>
                {this.GetGoal()}
            </div>
        </div>
    }

    public GetTeamTable() {
        return <table className='table table-scrum table-hover td-scrum'>
            <thead> 
                <tr>
                    <th className="well col-md-1"><b>Team:</b>
                    </th>
                </tr>
                <tr>
                    <th className="well col-md-1">{this.state.Sprint.team.name}
                    </th>
                </tr>
            </thead> 
            <tbody>
                {this.state.Sprint.team.members.map(user => this.renderMember(user))}
            </tbody>
        </table>
    }

    public GetBacklogTable() {
        return<table className='table table-scrum table-hover td-scrum'>
            <thead>
                <tr>
                    <th colSpan={2}
                        className="well col-md-2"><b>Backlog</b>
                    </th>
                    
                </tr>
                <tr>
                    <th className="well col-md-1"><b>Story's name</b>
                    </th>
                    <th className="well col-md-1"><b>Status</b>
                    </th>
                </tr>
            </thead>
            <tbody>
                {this.state.Sprint.backlog.map(story => this.renderStory(story))}
            </tbody>
        </table>
    }

    public GetGoal() {
        return <div>
            <p>Edit goal:</p>
            <form onSubmit={this.handleSave} name="oldForm">
                <textarea
                    style={{ width: "100%", height: "80px", fontSize: 20, padding: "7px"}}
                    className="fa-text-height"
                    name="Goal"
                    type="text"
                    value={this.state.Goal}
                    onChange={this.handleInputChange} />
                <div>
                    <button className="login100-form-btn">Save goal</button>
                </div>
            </form>
        </div>
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    private handleSave(event: any) {
        event.preventDefault();
        var form = new FormData(event.target);
        var goalUpdate = {
            Goal: this.state.Goal
        };

        fetch(this.updateURL,{
            method: 'Patch',
            body: JSON.stringify({
                '@odata.type': 'DAL.Models.SprintReview',
                ...goalUpdate
            }
            ),
            headers: {
                'OData-Version': '4.0',
                'Content-Type': 'application/json;odata.metadata=minimal',
                'Accept': 'application/json'
            }
        })
    }

    private renderMember(user: User) {
        return <tr key={user.userId}><td>{user.login}</td></tr>
    }

    private renderStory(story: Story) {
        return <tr key={story.id}>
            <td>{story.name}</td>
            <td>{story.status}</td>
        </tr>
    }

    private getSprintReview() {
        fetch(this.getSprintReviewURL, {
        })
            .then(response => response.json() as any)
            .then(data => {
                this.setSprintReview(data);
            })
    }

    private setSprintReview(data: any) {
        this.isLoading = false;
        var sprintReviewData = data['value'][0];
        var sprintReview = new SprintReview(sprintReviewData);
        this.setState(
            {
                Goal: sprintReview.goal,
                Sprint: sprintReview.sprint,
                SprintId: sprintReview.sprintId
            });
    }
}