import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Sprint } from './Models/Sprint';
import { Filter, IFilterConfiguration } from './Filters/Filter'
import { TextFilter } from './Filters/TextFilter'
import { IntFilter } from './Filters/IntFilter'
import { EnumFilter } from './Filters/EnumFilter'
import { SprintStage } from './Models/SprintStage'


interface SprintDataFetchingState {
    sprints: Sprint[];
    filters: any;
    loading: boolean;
}

export class SprintsGrid extends React.Component<RouteComponentProps<{}>, SprintDataFetchingState> {

    static readonly URL_BASE: string = 'odata/sprints';
    static readonly URL_EXPANDS: string = '?$expand=Team($expand=members),history'
    static readonly URL_ORDERING: string = '&$orderby=id'

    constructor() {
        super();
        this.state = { sprints: [], loading: true, filters: [] };

        this.LoadData();
    }

    private lastOrderingArg: string = "";
    private lastOrderingDir: boolean = false;
    private fileteringOn: boolean = false;
    private filterString: string = "";

    private LoadData() {
        fetch(this.getURL())
            .then(response => response.json() as any)
            .then(data => {
                var sprintsTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    sprintsTemp[i] = new Sprint(data["value"][i]);
                this.setState({ sprints: sprintsTemp, loading: false, filters: this.state.filters });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSprintsTable(this.state.sprints);

        return <div>
            <h1>Sprints</h1>
            {contents}
        </div>
    }



    private renderSprintsTable(sprints: Sprint[]) {

        return <table className='table table-scrum table-hover td-scrum'>
            {this.GetHeader()}
            {this.getFiltersLine()}
            <tbody>

                {this.state.sprints.map(s => s.renderAsTableRow())}
            </tbody>
            <tfoot>
                {this.RenderFooter()}
            </tfoot>
        </table>

    }


    private GetHeader() {
        return <thead>
            <tr>
                <th className="well well-sm" onClick={() => this.OrderBy("id")}><span className="nowrap">Database ID</span></th>
                <th className="well well-sm" onClick={() => this.OrderBy("name")}>Name</th>
                <th className="well well-sm" onClick={() => this.OrderBy("team")}>Team</th>
                <th className="well well-sm" onClick={() => this.OrderBy("stage")}>Stage</th>
                <th className="well well-sm" onClick={() => this.OrderBy("review")}>Review</th>
                <th className="well well-sm" onClick={() => this.OrderBy("history")}>History</th>
                <th className="well well-sm" onClick={() => this.OrderBy("retrospective")}>Retrospective</th>
                <th className="well well-sm">
                    <div onClick={this.FilterButtonClick.bind(this)}>
                        <span className="nowrap">Show Filters<span className="caret"></span></span>
                    </div>
                </th>
            </tr>
        </thead>;
    }
    private getFiltersLine() {
        //className={this.fileteringOn ? "" : "nodisplay"}
        return <tr >
            <td>
                <IntFilter filterKey='id' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='name' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='team/name' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <EnumFilter filterKey='stage' enumType={SprintStage} onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='review' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td >

            </td>
            <td>
                <TextFilter filterKey='retrospective' onFilterChanged={this.FilterChanged.bind(this)} />
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


    private RenderFooter() {
        return <tr>
            <td colSpan={8}>
                <div className="text-center">
                    <div role='button' className='btn btn-primary'>
                        Add new
                    </div>
                </div>
            </td>
        </tr>;
    }

    private getURL(): string {
        var result = SprintsGrid.URL_BASE;
        result += SprintsGrid.URL_EXPANDS;

        if (this.filterString != '')
            result += this.filterString;
        result += SprintsGrid.URL_ORDERING;
        return result;
    }

    private FilterChanged(key: string, filter: string) {

        this.state.filters[key] = filter;
    }

    private ApplyFiltersClick(e: any) {
        this.filterString = Filter.QUERY_HEAD;
        var i = 0;
        for (let iterator in this.state.filters) {
            if (this.state.filters[iterator] === '')
                continue;

            i++;
            if (i !== 1)
                this.filterString += Filter.CONSTRAIN_DIVIDER;
            this.filterString += this.state.filters[iterator];
        }

        if (i === 0) {
            this.filterString = '';
        }

        this.LoadData();

    }


    private CancelFiltersClick(e: any) {
        (document.getElementById("idFilter") as any).value = '';
        (document.getElementById("nameFilter") as any).value = '';
        (document.getElementById("teamFilter") as any).value = '';
        (document.getElementById("stageFilter") as any).value = '';
        (document.getElementById("reviewFilter") as any).value = '';
        (document.getElementById("historyFilter") as any).value = '';
        (document.getElementById("retrospectiveFilter") as any).value = '';
    }

    private FilterButtonClick(e: any) {
        this.fileteringOn = !this.fileteringOn
        this.forceUpdate();
    }

    private OrderBy(arg: string) {
        try {
            var sprintsN = [];
            sprintsN = this.state.sprints as any[];


            if (this.lastOrderingArg === arg)
                this.lastOrderingDir = !this.lastOrderingDir;
            else
                this.lastOrderingDir = false;


            if (!this.lastOrderingDir)
                sprintsN.sort((a, b) => this.SafeCompare(a, b, arg))
            else
                sprintsN.sort((a, b) => -this.SafeCompare(a, b, arg))

            this.lastOrderingArg = arg;
            this.setState({ sprints: sprintsN as Sprint[], loading: this.state.loading });
        } catch (e) {
            alert(e);
        }
    }

    private SafeCompare(a: any, b: any, arg: string) {
        if (a === undefined || b === undefined ||
            a[arg] === undefined || b[arg] === undefined)
            return 0;
        else
            return this.Compare(a[arg], b[arg])
    }

    private Compare(a: any, b: any): number {
        if (typeof a === 'number' && typeof b === 'number')
            return a - b;
        else
            return a.toString().localeCompare(b.toString());
    }
}




