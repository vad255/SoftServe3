import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Sprint } from './Models/Sprint';




interface SprintDataFetchingState {
    sprints: Sprint[];
    loading: boolean;
}

export class SprintsGrid extends React.Component<RouteComponentProps<{}>, SprintDataFetchingState> {
    constructor() {
        super();
        this.state = { sprints: [], loading: true };

        fetch('odata/sprints?$expand=Team($expand=members),history&$orderby=id')
            .then(response => response.json() as any)
            .then(data => {
                var sprintsTemp = [];

                for (var i = 0; i < data['value'].length; i++)
                    sprintsTemp[i] = new Sprint(data["value"][i]);

                this.setState({ sprints: sprintsTemp, loading: false });
            });
    } 

    private lastOrderingArg : string = "";
    private lastOrderingDir : boolean = false;
    private fileteringOn : boolean = false;


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
        let FiltersLine = this.getFiltersLine(this.fileteringOn);


        return <table className='table'>
            {this.GetHeader()}
            <tbody>
                {FiltersLine}
                {sprints.map(s => s.renderAsTableRow())}
            </tbody>
            <tfoot>
                {this.RenderFooter()}
            </tfoot>
        </table>

    }
    private GetHeader() {
        return <thead>
            <tr>
                <th className="well well-sm" onClick={() => this.OrderBy("id")}>Database ID</th>
                <th className="well well-sm" onClick={() => this.OrderBy("team")}>Team</th>
                <th className="well well-sm" onClick={() => this.OrderBy("stage")}>Stage</th>
                <th className="well well-sm" onClick={() => this.OrderBy("review")}>Review</th>
                <th className="well well-sm" onClick={() => this.OrderBy("history")}>History</th>
                <th className="well well-sm" onClick={() => this.OrderBy("retrospective")}>Retrospective</th>
                <th className="well well-sm">
                    <div onClick={this.FilterButtonClick.bind(this)}>
                        Show Filters <span className="caret"></span>
                    </div>
                </th>
            </tr>
        </thead>;
    }
    private RenderFooter() {
        return <tr>
            <td colSpan={7}>
                <div className="text-center">
                    <div role='button' className='btn btn-primary'>
                       Add new
                    </div>
                </div>
            </td>
        </tr>;
    }

   

    private getFiltersLine(on : boolean)
    {
        if (!on)
            return "";
        return <tr>
        <td className="myTd">
            <input className="searchInput" type="text" id="idSearch"/>
        </td>
        <td className="myTd">
            <input className="searchInput" type="text" id="idSearch"/>
        </td>
        <td className="myTd">
            <input className="searchInput" type="text" id="idSearch"/>
        </td>
        <td className="myTd">
            <input className="searchInput" type="text" id="idSearch"/>
        </td>
        <td className="myTd">
            <input className="searchInput" type="text" id="idSearch"/>
        </td>
        <td className="myTd">
            <input className="searchInput" type="text" id="idSearch"/>
        </td>
        <td className="myTd">
        <div className="btn bnt-xs" onClick={this.FilterButtonClick.bind(this)}>
                        Apply filters 
                    </div>
        </td>
    </tr>

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
                this.lastOrderingDir=false;

            

            if (!this.lastOrderingDir)
                sprintsN.sort((a,b) => {
                    if (a === undefined || a === null || b === undefined || b === null ||
                        a[arg] === undefined || a[arg] === null || b[arg] === undefined || b[arg] === null) 
                        return 0
                     else 
                        return a[arg].toString().localeCompare(b[arg].toString());
                    })
            else
                sprintsN.sort((a,b) => {
                    if (a === undefined || a === null || b === undefined || b === null ||
                        a[arg] === undefined || a[arg] === null || b[arg] === undefined || b[arg] === null) 
                        return 0
                     else 
                        return -a[arg].toString().localeCompare(b[arg].toString());
                    })

            this.lastOrderingArg = arg;
            this.setState({sprints : sprintsN as Sprint[], loading : this.state.loading});
        }catch(e)
        {
            alert(e);
        }
        
    }
}




