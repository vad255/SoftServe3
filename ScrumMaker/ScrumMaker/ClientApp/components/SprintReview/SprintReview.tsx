import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from '../Models/User';
import { Sprint } from '../Models/Sprint';


export class SprintReview extends React.Component<RouteComponentProps<{}>, {}> {

    constructor() {
        super();
        console.log("consructor")
    }

    private getSprintsURL: string = "odata/sprints/";
    private isLoading: boolean = false;
    private sprints: Sprint[] = [];

    //public render() {
    //    return <h1>Componrnt</h1>
    //}
    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();
              this.getUsers()

        return <div>{contents}</div>
    }

    public renderContent() {
        return <div>
            <h1>Component</h1>
        </div>
    }

    private getUsers() {
        fetch(this.getSprintsURL, {
        })
            .then(response => response.json() as any)
            .then(data => {
                this.setSprints(data);
            })
    }

    private setSprints(data: any) {
        this.isLoading = false;
        var sprintData = data['value'];
        for (var i = 0; i < sprintData.length; i++) {
            var sprint = new Sprint(sprintData[i])
            this.sprints.push(sprint);
        }
        
    }
}