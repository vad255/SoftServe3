import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import * as $ from "jquery";
import 'jqueryui';
import 'bootstrap';
import { User } from '../Models/User';
import { Story } from '../Models/Story';
import { Sprint } from "../Models/Sprint";

interface IUserDataFetchingState {
    users: User[];
    stories: Story[];
    storiesName: string[];
    sprints: Sprint[];
    sprintNumber: string;
}

export class SprintPlaning extends React.Component<RouteComponentProps<{}>, IUserDataFetchingState> {

    protected URL_BASE_Users: string = 'odata/Users';
    protected URL_BASE_Stories: string = 'odata/Stories';
    protected headerText: string = 'SprintPlaning';  
    private link: string = (window.location.href);
    readonly id: string;

    constructor(props: any) {
        super(props);
        this.id = this.link.substr(this.link.lastIndexOf('/') + 1);
        this.state = { users: [], stories: [], storiesName: [], sprints: [], sprintNumber: this.id };        
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this); 
        this.handleStoryNumberSelect = this.handleStoryNumberSelect.bind(this);
        this.LoadData();
    }

    handleSaveButtonClick() {
        
        let idStorys = this.GetStoryId();

        for (var i = 0; i < idStorys.length; i++) {           
            fetch('odata/Stories(' + idStorys[i] + ')'  ,
                {
                    method: 'PATCH',
                    headers: {
                        'OData-Version': '4.0',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;odata.metadata=minimal',

                    },
                    body: JSON.stringify({

                        '@odata.type': 'DAL.Models.Story',
                        'SprintId': this.state.sprintNumber
                    })
                })
        }
    }    

    componentDidMount() {

        var $tabs = $('#t_draggable2')
        $("tbody.t_sortable").sortable({
            connectWith: ".t_sortable",
            items: "> tr:not(:first)",
            appendTo: $tabs,
            helper: "clone",
            zIndex: 999990
        }).disableSelection();

        var $tab_items = $(".nav-tabs > li", $tabs).droppable({
            accept: ".t_sortable tr",
            hoverClass: "ui-state-hover",
            drop: function (event: any, ui: any) { return false; }
        });

        this.GetStoryName();
    }

    render() {
        return (
            <div>
                <h1 className="text-center">{this.headerText}</h1>
                <div>
                    <label style={{ marginRight: "5px" }}>Select sprint number:
                        <select style={{ marginTop: "10px" }} className="form-control-static" value={this.state.sprintNumber} onChange={this.handleStoryNumberSelect}>
                            {this.state.sprints.map(s => <option  key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </label>
                </div>
                <div>
                <table className="well col-md-1 table-hover td-scrum table-border" style={{ marginRight: "10px"}}><caption><h4>Users</h4></caption>
                    <thead className="table-scrum td-scrum">
                        <tr className="border">
                            <td><h5>User_name</h5></td>
                        </tr>
                    </thead>
                    <tbody className="table-scrum">
                        {
                            this.state.users.map(function (item: any) {
                                return <tr key={item} className="td-scrum"><td className="align-base">{item}</td></tr>
                            })
                        }
                    </tbody>
                </table>

                    <table className=" menu_links col-md-1 td-scrum" style={{ marginRight: "10px" }} id="t_draggable1">
                        <caption><h4>Product Backlog</h4></caption>
                        <tbody className="t_sortable table-scrum td-scrum">
                            <tr className="td-scrum border">
                                <td className="well"><h5>ID</h5></td>
                                <td className="well"><h5>Story_name</h5></td>
                                <td className="well"><h5>Story_description</h5></td>
                            </tr>
                            {this.state.stories.map(function (name: any) {
                                return <tr key={name.name} className="td-scrum" >
                                    <td className="well">{name.id}</td>
                                    <td className="well">{name.name}</td>
                                    <td className="well">{name.description}</td>
                                </tr>
                            })}
                        </tbody>
                </table>

                <table className="well menu_links col-md-1 td-scrum" id="t_draggable2">
                        <caption><h4>Sprint #{this.state.sprintNumber} Backlog</h4></caption>
                    <tbody className="t_sortable table-scrum td-scrum">
                        <tr className="td-scrum border">
                            <td className="well"><h5>ID</h5></td>
                            <td className="well"><h5>Story_name</h5></td>
                            <td className="well"><h5>Story_description</h5></td>
                        </tr>
                    </tbody>
                </table>

                <div role='button'
                    className='btn btn-primary'
                    style={{ marginLeft: "10px", marginTop: "-5px" }} 
                    data-toggle="modal"
                    data-target="#confirmDeleteModal"                 
                    onClick={this.handleSaveButtonClick}>
                    Save sprint
                </div>
                    {this.GetDeleteConfirmModal()}
                </div>
            </div>
        );
    }

    handleStoryNumberSelect(event: any) {
        this.setState({ sprintNumber: event.target.value });        
    }

    private GetDeleteConfirmModal() {      
        
        return <div id="confirmDeleteModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                        <h4 className="modal-title">The next story(ies) was updated:
                        <ul>{
                                this.GetStoryName().map(function (name: any) {
                                return <li>{name}</li>
                                })
                            }
                        </ul> </h4>
                    </div>
                    <div className="modal-body text-center">
                        <button className="btn btn-default" type="button" data-dismiss="modal">
                            Ok</button>
                    </div>
                </div>
            </div>
        </div>;
    }

    GetStoryId() {

        let storyId: string[] = [];
        let list = document.getElementById("t_draggable2") as any;

        for (var n = 3; n < list.getElementsByTagName("td").length; n += 3)
            storyId.push(list.getElementsByTagName("td")[n].textContent);                
        return storyId;       
    }

    GetStoryName() {

        let list
        if (document.getElementById("t_draggable2") != null) {
            list = document.getElementById("t_draggable2") as any;

            for (var m = 4; m < list.getElementsByTagName("td").length; m += 3)
                this.state.storiesName.push(list.getElementsByTagName("td")[m].textContent);
        }
        return this.state.storiesName;
    }

    protected LoadData() {

        fetch(this.getUrlUsers(), { credentials: 'include' })
            .then(response => response.json() as any)
            .then(data => {

                var usersTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    usersTemp[i] = data["value"][i]["Login"];
                
                this.setState({ users: usersTemp });
            });

        fetch(this.getUrlStories())
            .then(response => response.json() as any)
            .then(data => {

                var storiesTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    storiesTemp[i] = new Story(data['value'][i]);
                
                storiesTemp = storiesTemp.filter((n) => (n.sprintId === null));
                
                this.setState({ stories: storiesTemp });
            });

        fetch('odata/sprints', {
            credentials: 'include'
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                var sprintsData = [] as Sprint[];
               
                for (var i = 0; i < data["value"].length; i++) {
                    sprintsData[i] = new Sprint(data["value"][i]);
                }              
                this.setState({ sprints: sprintsData});
            }).catch(e => console.log(e));
    }

    private getUrlUsers() {

        let result = this.URL_BASE_Users;
        return result;
    }

    private getUrlStories() {

        let result = this.URL_BASE_Stories;
        return result;
    }
}



