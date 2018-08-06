import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from '../Models/User';
import { Sprint } from '../Models/Sprint';
import { Story, StoryStatus } from '../Models/Story';
import { DailyStandUp } from '../Models/DailyStandUp';
import { Role } from '../Models/Role';

                    

interface IUserDataFetchingState {

    SprintId: number ;
    Description: string;
    Conducted: Date;
    Sprint: Sprint;
    Myself: User;
}


export class DailyStandUpEdit extends React.Component<{}, IUserDataFetchingState> {
    constructor() {
        super();
        //this.state = (({ user: User, team: Team, teams: [], tasks: [] }) as any);
        //this.LoadData();
        this.getDailyStandUp();
        this.getMyself();
        //this.handleSave = this.handleSave.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
    }


    private link: string = (window.location.href);
    readonly id: string = this.link.substr(this.link.lastIndexOf('/') + 1);
    protected getDailyStandUpURL: string = 'odata/DailyStandUp?$expand=sprint($expand=backlog,team($expand=members($expand=role)))&$filter=id eq ';
    protected URL_BASE_Tasks: string = 'odata/Tasks';
    private isLoading: boolean = true;
    protected headerText: string = 'Daily Stand-Up Meeting';
    private updateURL: string = "odata/DailyStandUp/";
    //protected selectedUser: number = 0;



    render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>{contents}</div>
    }


    public renderContent() {
        return <div>

            {this.EditDailyStandUp()}
            
        </div>
    }


    public EditDailyStandUp() {
        return <div>
            <h1 className="text-center">{this.headerText}</h1>
            <div className="row">
                <div className="col-md-3">
                    {this.GetTeamTable()}
                </div>
               
            </div>
        </div>
    }


    public GetTeamTable() {
        return <table className='table table-scrum table-hover td-scrum'>
            <thead>
                <tr>
                    <th className="well col-md-1"><b>{this.state.Sprint.team.name}</b>
                    </th>
                </tr>
            </thead>
            <tbody>
                {this.state.Sprint.team.members.map(user => this.renderMember(user))}
            </tbody>
        </table>
    }


    private renderMember(user: User) {
        if (user.role.name !== "ScrumMaster")
            return <tr key={user.userId}>
                <td>
                    {user.login}
                </td>
            </tr >
        return <tr key={user.userId}>
            <td>
                {user.login} (<b>{user.role.name}</b>)
            </td>
        </tr>

    }

    getMyself(): Promise<any> {
        return fetch('/myself',
            { credentials: "include" }).
            then(response => response.json() as Promise<any>).
            then(data => {
                let user = new User(data);
                if (user.userId === 0)
                    user.userId = -1;

                this.setState({ Myself: user })
            });
    }

    private getDailyStandUp() {
        fetch(this.getDailyStandUpURL + this.id, {
            credentials: 'include',
        })
            .then(response => response.json() as any)
            .then(data => {
                this.setDailyStandUp(data);
            })
    }


    private setDailyStandUp(data: any) {
        this.isLoading = false;
        var dailyStandUpData = data['value'][0];
        var dailyStandUp = new DailyStandUp(dailyStandUpData);
        this.setState(
            {
                //id: sprintReview.id,
                SprintId: dailyStandUp.sprintId,
                Description: dailyStandUp.description,
                Conducted: dailyStandUp.conducted,
                Sprint: dailyStandUp.sprint
            });
    }

}








    //protected LoadData() {
    //    //    fetch(this.getUrlTeams(), { credentials: 'include' })
    //    //        .then(response => response.json() as any)
    //    //        .then(data => {

    //    //            var teamsTemp = [];
    //    //            for (var i = 0; i < data['value'].length; i++)
    //    //                teamsTemp[i] = new Team(data["value"][i]);
    //    //            //console.log(usersTemp);
    //    //            this.setState({ teams: teamsTemp });
    //    //        });


    //    //    fetch(this.getUrlTasks(), { credentials: 'include' })
    //    //        .then(response => response.json() as any)
    //    //        .then(data => {

    //    //            var tasksTemp = [];
    //    //            for (var i = 0; i < data['value'].length; i++)
    //    //                tasksTemp[i] = new Task(data["value"][i]);

    //    //            if (this.selectedUser != 0)
    //    //                tasksTemp = tasksTemp.filter((n) => (n.userId === this.selectedUser));
    //    //            //console.log(usersTemp);
    //    //            this.setState({ tasks: tasksTemp });
    //    //        });
    //    //}



    //    //public handleOnClick(event: any): void {
    //    //    this.selectedUser = event.userId;
    //    //}



    //    //private getUrlTeams() {
    //    //    let result = this.URL_BASE_Teams;
    //    //    return result;
    //    //}

    //    //private getUrlTasks() {
    //    //    let result = this.URL_BASE_Tasks;
    //    //    return result;
    //    //}

    //}










            //<h1 className="text-center">{this.headerText}</h1>
            //<table className="well col-md-1 table-hover td-scrum table-border" style={{ marginRight: "10px" }}><caption><h4>Users</h4></caption>
            //    <thead className="table-scrum td-scrum">
            //        <tr className="border">
            //            <td><h5>User_name</h5></td>
            //        </tr>
            //    </thead>
            //    <tbody className="table-scrum">
            //        {
            //            this.state.users.map(function (item: any) {
            //                return <tr key={item.userId} className="td-scrum"><td className="align-base">{item.login}</td></tr>
            //            })
            //        }
            //    </tbody>
            //</table>



            //<table className="well col-md-1 table-hover td-scrum table-border" style={{ marginRight: "10px" }}><caption><h4>Task History</h4></caption>
            //    <thead className="table-scrum td-scrum">
            //        <tr className="border">
            //            <td><h5>Id</h5></td>
            //            <td><h5>Planned Hours</h5></td>
            //            <td><h5>Remaining Hours</h5></td>
            //            <td><h5>Actual Hours</h5></td>
            //            <td><h5>User</h5></td>
            //        </tr>
            //    </thead>
            //    {this.state.tasks.map(function (task: any) {
            //        return <tr key={task.taskId} className="td-scrum" >
            //            <td className="well">{task.taskId}</td>
            //            <td className="well">{task.plannedHours}</td>
            //            <td className="well">{task.remainingHours}</td>
            //            <td className="well">{task.actualHours}</td>
            //            <td className="well">{task.userId}</td>

            //        </tr>
            //    }
            //    )}
            //</table>