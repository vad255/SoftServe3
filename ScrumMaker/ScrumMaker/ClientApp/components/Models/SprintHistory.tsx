import * as React from 'react';
import { IDbModel, ICommitableDbModel } from './Abstraction';
import * as moment from '../../../node_modules/moment';

export class SprintHistory implements ICommitableDbModel {

    public empty: boolean = true;
    public id: number = -1;
    begined: moment.Moment;
    ended: moment.Moment;

    constructor(params: any) {
        if (params === null || params === undefined) {
            return;
        }

        this.begined = params.Begined ? moment(params.Begined) : moment.min();
        this.ended = params.Ended ? moment(params.Ended) : moment.min();

        this.id = params.Id;
        this.empty = false;
    }

    public toString(): string {
        if (this.empty)
            return "";
        return this.begined ? this.begined.toISOString() : "";
    }

    getUpdateModel(): object {
        return {
            Id: this.id,
            Begined: this.begined ? this.begined.toISOString() : "",
            Ended: this.ended ? this.ended.toISOString() : ""
        }
    }
    getId(): number {
        return this.id;
    }
    toArray(): any[] {
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
                <div id={this.id.toString()} role="button" data-toggle="dropdown" className="btn btn-sm btn-primary" >
                    History <span className="caret"></span>
                </div>
                <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                    <li className="dropListItem">Begined: {this.begined.toDate().toLocaleDateString()}</li>
                    <li className="dropListItem">Ended:&nbsp;&nbsp;&nbsp;&nbsp;{this.ended.toDate().toLocaleDateString()}</li>
                </ul>
            </div>
    }
}
