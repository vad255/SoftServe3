import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Label } from 'react-bootstrap';

interface DefectDataExampleState {
    defect: Defect[];
    loading: boolean;
    defectMap: Defect[];
}

export class DefectGrid extends React.Component<RouteComponentProps<{}>, DefectDataExampleState> {
    constructor() {
        super();
        this.state = { defect: [], loading: true, defectMap: [] };
       // this.filterList = this.filterList.bind(this);
        this.handleSesarch = this.handleSesarch.bind(this);

       /* fetch('api/Defects/GetDefects')
            .then(response => response.json() as Promise<Defect[]>)
            .then(data => {
                this.setState({ defect: data, loading: false });
            });
            */
        fetch('odata/Defects')
            .then(response => response.json() as Promise<Defect[]>)
            .then(data => {
                this.setState({ defect: data, loading: false, defectMap: data });
            });
    }
    /*
    filterList(e: any) {
        var filteredList = this.state.defect.filter(function (item) {
            return item.defectName.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        });

        this.setState({ defect: filteredList });
    }
    */
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : DefectGrid.renderDefectsTable(this.state.defect);

        return <div>
            <h1>Defects</h1>
            <label>Search
                <input placeholder="Find by name" className="input-sm" onChange={this.handleSesarch} />
            </label>
            <p>This component demonstrates Defects from the server.</p>
            {contents}
        </div>;
    }

    handleSesarch(event: any) {
        var searchQuery = event.target.value;

        fetch("odata/defects()?$filter=contains(DefectName, '" + searchQuery + "')")
            .then(response => response.json() as Promise<Defect[]>)
            .then(data => {
                if (searchQuery === "" || searchQuery === null || searchQuery === " ") {
                    this.setState({ defect: this.state.defectMap });
                } else {
                    this.setState({ defect: data });
                }

            });
    }

    private static renderDefectsTable(defects: Defect[]) {
        return <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Descrition</th>
                    <th>Priority</th>
                    <th>State</th>
                    <th>Status</th>  
                    <th>ActualResults</th>
                    <th>FixResults</th>
                </tr>
            </thead>
            <tbody>
                {defects.map(defect =>
                    <tr key={defect.defectId}>
                        <td>{defect.defectId}</td>
                        <td>{defect.defectName}</td>
                        <td>{defect.description}</td>
                        <td>{defect.priority}</td>
                        <td>{defect.state}</td>
                        <td>{defect.status}</td>
                        <td>{defect.actualResults}</td>
                        <td>{defect.fixResults}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface Defect {
    defectId: number;
    defectName: string;
    description: string;
    priority: string;
    state: string;
    status: string;
    actualResults: string;
    fixResults: string;
}
