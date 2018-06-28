import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Filter, IFilterConfiguration } from './Filter'
import { TextFilter } from './TextFilter'
import { IntFilter } from './IntFilter'
import { EnumFilter } from './EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from './EmptyFilter';


export interface IFilterString {
    onApply: Function;
    display: boolean
}


export class SprintsFiltersRow extends React.Component<IFilterString, IFilterString> {
    constructor(params: IFilterString) {
        super(params);
        this.state = { onApply: params.onApply, display: params.display  }

    
    }



    public fileteringOn: boolean = false;
    private filterString: string = '';
    private filters: any = {};

    render() {     
        return <tr className={this.props.display? "": "nodisplay"}>
            <td>
                <IntFilter ref="id" filterKey='id' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="name" filterKey='name' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="team" filterKey='team/name' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <EnumFilter ref="stage" filterKey='stage' enumType={SprintStage} onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="rev" filterKey='review' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <EmptyFilter />
            </td>
            <td>
                <TextFilter ref="ret" filterKey='retrospective' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <div role="button" className="btn btn-sq-xs align-base " onClick={this.CancelFiltersClick.bind(this)}>
                    <span className="glyphicon glyphicon-remove-circle dark" aria-hidden="true"></span>
                </div>
                &nbsp;&nbsp;
            <div role="button" className="btn btn-sq-xs align-base" onClick={this.ApplyFiltersClick.bind(this)}>
                    <span className="glyphicon glyphicon-ok dark" aria-hidden="true"></span>
                </div>
            </td>
        </tr>
    }


    private FilterChanged(key: string, filter: string) {

        this.filters[key] = filter;
    }

    private ApplyFiltersClick(e: any) {
        console.log('call');

        this.filterString = Filter.QUERY_HEAD;
        var i = 0;
        for (let iterator in this.filters) {
            if (this.filters[iterator] === '')
                continue;

            i++;
            if (i !== 1)
                this.filterString += Filter.CONSTRAIN_DIVIDER;
            this.filterString += this.filters[iterator];
        }

        if (i === 0) {
            this.filterString = '';
        }
console.log(this.filterString);

        this.state.onApply(this.filterString);
    }


    private CancelFiltersClick(e: any) {
        for (const key in this.refs) {
            let temp = this.refs[key] as Filter;
            if (temp !== null && temp !== undefined){
                temp.Reset();
                
            }
        }
    }
   

}
