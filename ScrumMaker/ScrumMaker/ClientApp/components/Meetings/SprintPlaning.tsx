import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import * as $ from "jquery";
import 'jqueryui';
import 'bootstrap';
import { User } from '../Models/User';
import { Story } from '../Models/Story';

interface IUserDataFetchingState {
    users: User[];
    stories: Story[];
}
var divStyle = {
    marginRight: "10px"
};
var border = {
    borderBottom: "solid 3px #808080",
    borderTop: "solid 3px #808080",
    backgroundColor: "rgba(229, 229, 229, 0.63)"
}
export class SprintPlaning extends React.Component<RouteComponentProps<{}>, IUserDataFetchingState> {
    protected URL_BASE_Users: string = 'odata/Users';
    protected URL_BASE_Stories: string = 'odata/Stories';
    protected headerText: string = 'SprintPlaning';

    constructor(props: any) {
        super(props);

        this.state = { users: [], stories: [] };
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.LoadData();
    }

    handleSaveButtonClick() {
        
        let idStorys = this.GetStoryId();

        for (var i = 0; i < idStorys.length; i++) {
            console.log(idStorys[i])
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
                        'SprintId': 1
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
    }

    render() {
        return (
            <div>
                <h1 className="text-center">{this.headerText}</h1>
                <table className="well col-md-1 table-hover td-scrum table-border" style={divStyle}><caption><h4>Users</h4></caption>
                    <thead className="table-scrum td-scrum">
                        <tr style={border}>
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

                <table className=" menu_links col-md-1 td-scrum" style={divStyle} id="t_draggable1"><caption><h4>Product Backlog</h4></caption>

                    <tbody className="t_sortable table-scrum td-scrum">
                        <tr className="td-scrum" style={border}>
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

                <table className="well menu_links col-md-1 td-scrum" style={divStyle} id="t_draggable2"><caption><h4>Sprint Backlog</h4></caption>
                    <tbody className="t_sortable table-scrum">
                        <tr style={border}>
                            <td className="well"><h5>ID</h5></td>
                            <td className="well">Story_name</td>
                            <td className="well">Story_description</td>
                        </tr>
                    </tbody>
                </table>

                <div role='button'
                    className='btn btn-primary'
                    data-toggle="modal"
                    data-target="#confirmDeleteModal"                 
                    onClick={this.handleSaveButtonClick}>
                    Save sprint
                    </div>
                {this.GetDeleteConfirmModal()}
            </div>
        );
    }

    private GetDeleteConfirmModal() {
        let nameStories: any[] = [];
        nameStories = this.state.stories.map(function (name: any) {
            return <li>{name.name}</li> 
        });
        console.log(nameStories);
        return <div id="confirmDeleteModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                        <h4 className="modal-title">The next story(ies) was updated:
                        <ul>{
                                this.state.stories.map(function (name: any) {
                                return <li>{name.name}</li>
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


