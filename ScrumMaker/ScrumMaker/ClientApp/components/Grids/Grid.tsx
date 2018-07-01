import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Sprint } from '../Models/Sprint';
import { SprintStage } from '../Models/SprintStage'
import { SprintsFiltersRow } from '../Filters/SprintsFiltersRow'
import { Content } from 'react-bootstrap/lib/Tab';

export abstract class Grid<P, S> extends React.Component<P, S> {
    constructor() {
        super();
        this.isLoading = true
    }

    protected abstract headerText: string;
    protected abstract pageSize: number;
    protected isLoading: boolean = true;

    protected readonly abstract URL_BASE: string;
    protected readonly abstract URL_EXPANDS: string;
    protected urlFilters: string = '';
    protected readonly abstract URL_ORDERING: string;

    private lastOrderingArg: string = '';
    private lastOrderingDir: boolean = false;
    protected filteringOn: boolean = false;


    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>
            <h1>{this.headerText}</h1>
            {contents}
        </div>
    }

    private renderContent() {
        return <table className='table table-scrum table-hover td-scrum'>
            <thead>
                {this.GetHeaderRow()}
                {this.GetFiltersRow()}
            </thead>
            <tbody>
                {this.GetBodyRows()}
            </tbody>
            <tfoot>
                {this.RenderFooter()}
            </tfoot>
        </table>
    }

    protected LoadData() {
        fetch(this.getURL())
            .then(response => response.json() as any)
            .then(data => {
                this.OnDataReceived(data);
            });
    }

    private getURL() {

        let result = this.URL_BASE;

        result += this.URL_EXPANDS;

        result += this.urlFilters;

        result += this.URL_ORDERING;

        return result;
    }


    protected FilterButtonClick(e: any) {
        this.filteringOn = !this.filteringOn
        this.forceUpdate();
    }

    protected ApplyFiltersHandler(e: any) {
        this.urlFilters = e;
        this.LoadData();
    }

    protected abstract OnDataReceived(data: any): void;

    protected abstract GetHeaderRow(): JSX.Element;
    protected abstract GetFiltersRow(): JSX.Element;
    protected abstract GetBodyRows(): JSX.Element[];
    protected abstract RenderFooter(): JSX.Element;
    
    // Provide access to gridItems for sorting method
    protected abstract getData(): any[];

    protected OrderBy(arg: string) {
        try {
            let data = [];
            data = this.getData();
            
            if (this.lastOrderingArg === arg)
                this.lastOrderingDir = !this.lastOrderingDir;
            else
                this.lastOrderingDir = false;
            
            if (!this.lastOrderingDir)
                data.sort((a, b) => this.SafeCompare(a, b, arg))
            else
                data.sort((a, b) => -this.SafeCompare(a, b, arg))

            this.lastOrderingArg = arg;
            this.forceUpdate();
        } catch (e) {
            alert(e);
        }
    }

    private SafeCompare(a: any, b: any, arg: string) {
        let aUndef = a === undefined || a === null || a[arg] === undefined || a[arg] === null;
        let bUndef = b === undefined || b === null || b[arg] === undefined || b[arg] === null;

        if (!aUndef && !bUndef)
            return this.Compare(a[arg], b[arg])

        if (aUndef && bUndef)
            return 0;

        if (aUndef)
            return 1;

        return -1;
    }

    private Compare(a: any, b: any): number {
        if (typeof a === 'number' && typeof b === 'number')
            return a - b;
        else
            return a.toString().localeCompare(b.toString());
    }
}




