import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Sprint } from './Models/Sprint';
import * as ReactDOM from 'react-dom';



interface SprintDataFetchingState {
    sprints: Sprint[];
    filters: any;
    loading: boolean;
}

export class SprintsGrid extends React.Component<RouteComponentProps<{}>, SprintDataFetchingState> {

    static readonly URL_BASE : string = 'odata/sprints';
    static readonly URL_EXPANDS : string = '?$expand=Team($expand=members),history'
    static readonly URL_ORDERING : string = '&$orderby=id'

    constructor() {
        super();
        this.state = { sprints: [], loading: true, filters: []};

        this.LoadData();
    } 

    private lastOrderingArg : string = "";
    private lastOrderingDir : boolean = false;
    private fileteringOn : boolean = false;
    private filterString : string = "";

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
            <p>Here represented all sprints from the database.</p>
            {contents}
            </div>
    }

  

    private renderSprintsTable(sprints: Sprint[]) {

        return <table className='table'>
            {this.GetHeader()}
            <tbody>
                {this.getFiltersLine()}
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
    private getFiltersLine()
    {
        if (!this.fileteringOn)
            return <tr><td colSpan={8} className="nodisplay"><div className="container"><img src='/images/loading.gif'/></div></td></tr>
        return <tr>
        <td className="align-base">
            <input className="searchInput"  type="text"  id="idFilter" 
            onChange={((e : any) => this.FilterChanged("id", e)).bind(this)}/>
        </td>
        <td className="align-base">
            <input className="searchInput" type="text"  id="nameFilter"
            onChange={((e : any) => this.FilterChanged("name", e)).bind(this)}/>
        </td>
        <td className="align-base">
            <input className="searchInput" type="text"  id="teamFilter"
            onChange={((e : any) => this.FilterChanged("team/name", e)).bind(this)}/>
        </td>
        <td className="align-base">
            <input className="searchInput" type="text"  id="stageFilter" />
        </td>
        <td className="align-base">
            <input className="searchInput" type="text"  id="reviewFilter"
            onChange={((e : any) => this.FilterChanged("review", e)).bind(this)}/>
        </td>
        <td className="align-base">
            <input className="searchInput" type="text"  id="historyFilter"
            onChange={((e : any) => this.FilterChanged("history/initiated", e)).bind(this)}/>
        </td>
        <td className="align-base">
            <input className="searchInput" type="text"  id="retrospectiveFilter"
            onChange={((e : any) => this.FilterChanged("retrospective", e)).bind(this)}/>
        </td>
        <td className="align-base">
        <div  role="button" className="btn btn-sq-xs" onClick={this.CancelFiltersClick.bind(this)}>
                <img src='/images/cancel_256.png' alt='upd' className="btn-img" /> 
            </div> &nbsp;
            <div role="button" className="btn btn-sq-xs" onClick={this.ApplyFiltersClick.bind(this)}> 
                <img src='/images/ok_512.png' alt='Apply' className="btn-img" /> 
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

    private getURL() : string{
        var result = SprintsGrid.URL_BASE;
        result += SprintsGrid.URL_EXPANDS;

        if (this.filterString != '')
            result += this.filterString;
        result += SprintsGrid.URL_ORDERING;
        return result;
    }

    private FilterChanged(key: string, e: any){
        this.state.filters[key] = e.target.value;
    }

    private ApplyFiltersClick(e : any){
        this.filterString = "&$filter=";
        var i = 0;
        for (let iterator in this.state.filters) {
            if (this.state.filters[iterator] === '')
                continue;

            i++;
            console.log(iterator);
            this.filterString += 'contains(' + iterator + ', \'' + this.state.filters[iterator] + '\') and ';
        }
        
        if (i > 0)
        {
            this.filterString =  this.filterString.substring(0, this.filterString.length - 5);
        }
        else
        {
            console.log("NoFilters");
            this.filterString = '';
        }

        this.LoadData();
    
    }


    private CancelFiltersClick(e: any){
       (document.getElementById("idFilter") as any).value = '';
       (document.getElementById("nameFilter") as any).value = '';
       (document.getElementById("teamFilter") as any).value = '';
       (document.getElementById("stageFilter") as any).value = '';
       (document.getElementById("reviewFilter") as any).value = '';
       (document.getElementById("historyFilter") as any).value = '';
       (document.getElementById("retrospectiveFilter") as any).value = '';
    }

    private FilterButtonClick(e : any)
    {
        this.fileteringOn = !this.fileteringOn
        this.forceUpdate(); 

    }

    private OrderBy(arg: string)
    {
        try{
            var sprintsN = [];
            sprintsN = this.state.sprints as any[];
            

            if (this.lastOrderingArg === arg)
                this.lastOrderingDir = !this.lastOrderingDir;
            else
                this.lastOrderingDir = false;
           

            if (!this.lastOrderingDir)
                sprintsN.sort((a,b) => this.SecureCompare(a,b,arg))
            else
                sprintsN.sort((a,b) => -this.SecureCompare(a,b,arg))

            this.lastOrderingArg = arg;
            this.setState({sprints : sprintsN as Sprint[], loading : this.state.loading});
        }catch(e)
        {
            alert(e);
        } 
    }

    private SecureCompare(a : any, b : any, arg: string)
    {
        if (a === undefined || b === undefined ||
            a[arg] === undefined || b[arg] === undefined) 
            return 0;
         else 
            return this.Compare(a[arg], b[arg])
    }

    private Compare(a: any, b: any): number{
        if(typeof a === 'number' && typeof b === 'number')
            return a - b;
        else
            return a.toString().localeCompare(b.toString());
    }
}




