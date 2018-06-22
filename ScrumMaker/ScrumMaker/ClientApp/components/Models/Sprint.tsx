import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import {Team} from './Team'


enum DisplayMod
{
    read,
    noData,
    edit
}

export class Sprint extends React.Component{
    id: number = -1;
    stage: string = '';
    history: SprintHistory;
    backlog: string = '';
    defects: string = '';
    dailyScrums: string = '';
    review: string = '';
    retrospective: string = '';
    team: Team;
    
    mod: DisplayMod= DisplayMod.noData;

    public constructor(params: any) {

        super(params);

        if(params === null || params === undefined)
        {
            return;
        }

        this.id = params.Id;
        this.stage = params.Stage;
        this.history = new SprintHistory(params.History);
        this.backlog = params.Backlog;
        this.defects = params.Defects;
        this.dailyScrums = params.DailyScrums;
        this.review = params.Review;
        this.retrospective = params.Retrospective;
        this.team = new Team(params.Team);

        this.mod = DisplayMod.read;
    }

    public toString() : string {
        return this.id.toString();
    }

    updateButtonClick(event: any)
    {
        this.SendItem();
        this.setState(this.mod = DisplayMod.edit);
    }

    saveButtonClick(event: any)
    {


    }

    cancelButtonClick(event: any)
    {
       this.setState(this.mod = DisplayMod.read) 
    }

    deleteButtonClick(event: any)
    {
        //alert('call');
        //this.SentItem();
        fetch('api/sprints/delete',
        {
            method:'DELETE',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            dataType: "json"},
            body: JSON.stringify({id: this.id})
         });

        this.setState(this.mod = DisplayMod.noData);
    }

    public SendItem() {
        fetch('api/sprints/create',
        {
            method:'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(this.props) 
         });
    }  

     public render()
     {
         switch(this.mod)
         {
            case DisplayMod.read:
                return this.renderAsTableRow();
                
            //case DisplayMod.edit:
            //    return this.renderAsInput();
                
            case DisplayMod.noData:
                return (null);   

         }
         return <form><text>Hello</text><button>Submit</button></form>

     }

    public renderAsTableRow() {
        return <tr key={this.id}>
            <td>{this.id}</td>
            <td>{this.team.renderAsMenu()}</td>
            <td>{this.stage}</td>
            <td>{this.review}</td>
            <td>{this.history.renderAsMenu()}</td>
            <td>{this.retrospective}</td>
            <td>
            <div id={this.id.toString()} role="button" className="btn btn-default btn-upd" onClick={this.updateButtonClick.bind(this)}>
                <img src='/images/update_btn_128.ico' alt='upd' className="btn-img" /> 
            </div> &nbsp;
            <div id={this.id.toString()} role="button" className="btn btn-default btn-del" onClick={this.deleteButtonClick.bind(this)}> 
                <img src='/images/delete_btn_128.ico' alt='upd' className="btn-img" /> 
            </div>
         </td>
        </tr>;
    }
}


export class SprintHistory extends React.Component {

    public empty: boolean = true;
    public id: number = -1;
    initiated: Date;
    planned: Date;
    begined: Date;
    reviewDone: Date;
    retrospectiveDone: Date;

    constructor(params: any) {
        super(params);
        if (params === null || params === undefined) {
            return;
        }
        this.empty = false;
        this.id = params.id;

        
        this.initiated = new Date(params.Initiated);
        this.planned = new Date(params.Planned);
        this.begined = new Date(params.Begined);
        this.reviewDone = new Date(params.ReviewDone);
        this.retrospectiveDone = new Date(params.RetrospectiveDone);
    }

    public toString() : string {
        if (this.empty)
            return "";
        return this.initiated.toLocaleDateString();
    }

    public renderAsMenu() {
        if (this.empty)
            return  <div id="{this.id}" role="button" data-toggle="dropdown" className="btn btn-sm btn-default"> No Data </div>
        else
            return <div className="dropdown">
                <div id="{this.id}" role="button" data-toggle="dropdown" className="btn btn-sm btn-primary" >
                    History <span className="caret"></span>
                </div>
                <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                    <li className="dropListItem"><pre>Initiated:     {this.initiated.toLocaleDateString()}</pre></li>
                    <li className="dropListItem"><pre>Planned:       {this.planned.toLocaleDateString()}</pre></li>
                    <li className="dropListItem"><pre>Beginned:      {this.begined.toLocaleDateString()}</pre></li>
                    <li className="dropListItem"><pre>Review:        {this.reviewDone.toLocaleDateString()}</pre></li>
                    <li className="dropListItem"><pre>Retrospective: {this.retrospectiveDone.toLocaleDateString()}</pre></li>
                </ul>
            </div>
    }
}
