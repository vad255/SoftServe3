import * as React from 'react';
import { IDbModel, ICommitableDbModel } from './Abstraction';
import * as moment from 'moment';

export class SprintHistory implements ICommitableDbModel {

    public empty: boolean = true;
    public id: number = -1;
    begined: moment.Moment = moment.min();
    ended: moment.Moment = moment.min();

    constructor(params: any) {
        if (!params)
            return;

        this.begined = params.Begined ? moment(params.Begined) : moment.min();
        this.ended = params.Ended ? moment(params.Ended) : moment.min();

        this.id = params.Id ? params.Id : -1;
        this.empty = false;
    }

    public toString(): string {
        return this.empty ? this.begined.toISOString() : "";
    }

    public getUpdateModel(): object {
        return {
            Id: this.id,
            Begined: this.begined ? this.begined.toISOString() : "",
            Ended: this.ended ? this.ended.toISOString() : ""
        }
    }
    public getId(): number {
        return this.id;
    }
    public toArray(): any[] {
        return [
            this.id,
            this.begined,
            this.ended
        ]
    }


    public renderAsMenu() {
        if (this.empty)
            return <div id="nodata" role="button" data-toggle="dropdown" className="btn btn-sm btn-default"> No Data </div>
        else
            return <div className="dropdown">
                <button id={this.id.toString()} role="button" data-toggle="dropdown" className="scrum-btn btn-dark " >
                    History <span className="caret"></span>
                </button>
                <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                    <li className="dropListItem">Begined: {this.begined.toDate().toLocaleDateString()}</li>
                    <li className="dropListItem">Ended:&nbsp;&nbsp;&nbsp;&nbsp;{this.ended.toDate().toLocaleDateString()}</li>
                </ul>
            </div>
    }
}
