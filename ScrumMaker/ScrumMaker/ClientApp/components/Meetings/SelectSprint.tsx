import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sprint } from '../Models/Sprint';
import { NavLink } from 'react-router-dom';
import { SprintReview } from '../Models/SprintReview';

interface ISprintsFetchingState {
    Sprints: Sprint[];
    SprintReviews: SprintReview[];
    SprintReview: SprintReview;
}

export class SelectSprint extends React.Component<RouteComponentProps<{}>, ISprintsFetchingState> {
    constructor() {
        super();
        this.getSprints();
        this.getSprintReviews();
    }

    private isLoading: boolean = true;
    private sprintURL: string = "odata/sprints?$expand=history";
    private sprintReviewURL: string = "odata/SprintReview?$expand=sprint";

    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>{contents}</div>
    }

    public renderContent() {
        return <div>
            <h3>Choose sprint:</h3>
            {this.ShowSprints()}
        </div>
    }

    private getSprints() {
        fetch(this.sprintURL, { credentials: "include" })
            .then(response => response.json() as any)
            .then(data => {
                this.setSprints(data);
            })
    }

    private setSprints(data: any) {
        this.isLoading = false;
        var sprintsData = data['value'];
        let sprints: Sprint[] = [];
        for (var i = 0; i < sprintsData.length; i++) {
            var sprint = new Sprint(sprintsData[i])
            sprints.push(sprint);
        }
        this.setState(
            {
                Sprints: sprints
            });
    }

    private getSprintReviews() {
        fetch(this.sprintReviewURL, {
            credentials: 'include'
        })
            .then(response => response.json() as any)
            .then(data => {
                this.setSprintReviews(data);
            })
    }

    private setSprintReviews(data: any) {
        this.isLoading = false;
        var sprintReviewsData = data['value'];
        let sprintReviews: SprintReview[] = [];
        for (var i = 0; i < sprintReviewsData.length; i++) {
            var sprintReview = new SprintReview(sprintReviewsData[i])
            sprintReviews.push(sprintReview);
        }
        this.setState(
            {
                SprintReviews: sprintReviews
            });
    }

    private ShowSprints() {
        return <div>
            <ul>
                {this.state.Sprints && this.state.SprintReviews && this.state.Sprints.map(sprint => this.RenderSprint(sprint))}
            </ul>
        </div>
    }

    private RenderSprint(sprint: Sprint) {
        var sprintReviewId = this.findSprintReview(sprint);
        return <li key={sprint.id}>
            <br />
            <b>{sprint.name}</b>
            {this.renderSprintReviewButton(sprint, sprintReviewId)}
        </li>
    }

    private findSprintReview(sprint: Sprint) {
        for (var i = 0; i < this.state.SprintReviews.length; i++) {
            if (this.state.SprintReviews[i].sprintId === sprint.id) {
                return this.state.SprintReviews[i].id
            }
        }
    }

    private renderSprintReviewButton(sprint: Sprint, sprintReviewId: any) {
        if (sprintReviewId) {
            return <button className="btn btn-default" onClick={() => this.props.history.push('/SprintReviewEdit/' + sprintReviewId)}>
                    Review
            </button >
        }

        return <button className="btn btn-default" onClick={() => this.createSprintReview(sprint.id)}>
           Create
        </button >
    }

    createSprintReview(sprintId: number) {
        console.log(sprintId)
        let newSprintReview = new SprintReview({ SprintId: sprintId, IsGoalAchived: false, IsStoriesCompleted: false });
        console.log(newSprintReview);
        fetch("SprintReview/CreateReview/", {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                '@odata.type': 'DAL.Models.SprintReview',
                ...newSprintReview
            }),
            headers: {
                'OData-Version': '4.0',
                'Content-Type': 'application/json;odata.metadata=minimal',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.props.history.push('/SprintReviewEdit/'+ data.Id) 
            });
    }
}