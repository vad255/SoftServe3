import * as React from 'react';
import { IDbModel, ICommitableDbModel } from './Abstraction';

export class SprintHistory implements ICommitableDbModel {

    public empty: boolean = true;
    public id: number = -1;
    begined: Date;
    ended: Date;

    constructor(params: any) {
        if (params === null || params === undefined) {
            return;
        }

        this.begined = new Date(params.Begined);
        this.ended = new Date(params.Ended);

        this.id = params.Id;
        this.empty = false;
    }

    public toString(): string {
        if (this.empty)
            return "";
        return this.begined.toLocaleDateString();
    }

    getUpdateModel(): object {
        return {
            Id: this.id,
            Begined: this.begined ? this.begined.toISOString() : "",
            Ended: this.ended ? this.begined.toISOString() : ""
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
                    <li className="dropListItem"><pre>Beginned:      {this.begined.toLocaleDateString()}</pre></li>
                    <li className="dropListItem"><pre>Ended:        {this.ended.toLocaleDateString()}</pre></li>
                </ul>
            </div>
    }
}
