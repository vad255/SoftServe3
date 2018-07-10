import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Grid } from './Grid'
import { Defect } from '../Models/Defect';
import { DefectsFiltersRow } from '../Filters/DefectsFiltersRow'

interface IDefectDataFetchingState {
    defects: Defect[];
}

export class DefectGrid extends Grid<IDefectDataFetchingState> {

    
    protected URL_BASE: string = 'odata/defects';
    protected URL_EXPANDS: string = '?expand=()';
    protected URL_ORDERING: string = '&$orderby=DefectId';
    protected headerText: string = 'Defects';

    constructor() {
        super();
        this.LoadData();       
    }

    protected OnDataReceived(data: any) {
        this.isLoading = false;
        var defectsTemp = [];
       
        for (var i = 0; i < data['value'].length; i++)
            defectsTemp[i] = new Defect(data['value'][i]);            

        this.setState({ defects: defectsTemp });
    }

    protected getData() {
        return this.state.defects;
    }

    protected GetHeaderRow(): JSX.Element {
        return <tr>
            <th className="well well-sm" onClick={() => this.OrderBy("defectId")}><span className="nowrap">ID</span></th>
            <th className="well well-sm" onClick={() => this.OrderBy("name")}>Name</th>
            <th className="well well-sm" onClick={() => this.OrderBy("description")}>Description</th>
            <th className="well well-sm" onClick={() => this.OrderBy("priority")}>Priority</th>
            <th className="well well-sm" onClick={() => this.OrderBy("state")}>State</th>
            <th className="well well-sm" onClick={() => this.OrderBy("status")}>Status</th>
            <th className="well well-sm" onClick={() => this.OrderBy("actualResults")}>ActualResults</th>
            <th className="well well-sm" onClick={() => this.OrderBy("fixResults")}>FixResults</th>
            <th className="well well-sm">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }
    protected GetFiltersRow(): JSX.Element {
        return <DefectsFiltersRow
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
        />
    }
    protected GetBodyRows(): JSX.Element[] {
        return this.state.defects.map((s) => s.renderAsTableRow());
    }   
    
}
