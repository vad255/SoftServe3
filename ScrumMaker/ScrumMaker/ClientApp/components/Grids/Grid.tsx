import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { IDbModel, IFetchState } from '../Models/IDbModel';
import { NavLink } from 'react-router-dom'

export abstract class Grid extends React.Component<RouteComponentProps<{}>, IFetchState> {
    constructor() {
        super();
        this.isLoading = true;
    }

    protected abstract headerText: string;
    private pageSize: number = 5;
    protected isLoading: boolean = true;


    protected readonly URL_EDIT: string = "!!!NOT_IMPLEMENTED!!!/";

    protected readonly abstract URL_BASE: string;
    protected readonly abstract URL_EXPANDS: string;
    protected urlFilters: string = '';
    protected readonly abstract URL_ORDERING: string;
    private readonly URL_COUNT: string = '&$count=true';
    private urlPaging: string = '&$top=' + this.pageSize;

    private CurrentPage = 0;
    private allCount = 0;
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

    protected renderContent() {
        return <table className='table table-scrum table-hover td-scrum'>
            <thead>
                {this.GetHeaderRow()}
                {this.GetFiltersRow()}
            </thead>
            <tbody>
                {this.GetBodyRows()}
            </tbody>
            <tfoot>
                {this.GetFooterRow()}
            </tfoot>
        </table>
    }

    protected LoadData() {
        fetch(this.getURL(), { credentials: 'include' })
            .then(response => response.json() as any)
            .then(data => {
                this.allCount = data['@odata.count'];
                this.OnDataReceived(data);
            }).catch(e => this.onCatch(e));
    }



    protected getURL() {

        let result = this.URL_BASE;

        result += this.URL_EXPANDS;

        result += this.urlFilters;

        result += this.URL_ORDERING;

        result += this.urlPaging;

        result += this.URL_COUNT;

        return result;
    }

    protected OnDataReceived(data: any): void {
        this.isLoading = false;

        let itemsTemp: IDbModel[] = [];
        for (var i = 0; i < data['value'].length; i++)
            itemsTemp[i] = this.instantiate(data["value"][i]);

        this.setState({ items: itemsTemp });
    }

    protected abstract instantiate(item: any): IDbModel;

    protected onCatch(e: any) {
        console.error(e);
        //   this.props.history.push("/Error")
    }


    protected abstract GetHeaderRow(): JSX.Element;
    protected abstract GetFiltersRow(): JSX.Element;
    protected GetBodyRows(): JSX.Element[] {
        return this.state.items.map((s) => this.toGridItem(s.toArray(), s.getId()))
    }
    private GetFooterRow() {
        return <tr>
            <td colSpan={8}>
                <div className="text-center">
                    <div role='button' className='btn btn-sq-xs align-base' onClick={this.firstPageClick.bind(this)}>
                        <span className="glyphicon glyphicon-step-backward dark"></span>
                    </div>
                    <div role='button' className='btn btn-sq-xs align-base' onClick={this.previousPageClick.bind(this)}>
                        <span className="glyphicon glyphicon-chevron-left dark"></span>
                    </div>
                    {Math.ceil(this.CurrentPage + 1)} of {Math.ceil(this.allCount / this.pageSize)}
                    <div role='button' className='btn btn-sq-xs align-base' onClick={this.nextPageClick.bind(this)}>
                        <span className="glyphicon glyphicon-chevron-right dark"></span>
                    </div>
                    <div role='button' className='btn btn-sq-xs align-base' onClick={this.lastPageClick.bind(this)}>
                        <span className="glyphicon glyphicon-step-forward dark"></span>
                    </div>
                </div>
            </td>
        </tr>;
    }

    private firstPageClick() {
        this.CurrentPage = 0;
        this.recalcPagingUrl()
        this.LoadData();
    }
    private previousPageClick() {
        if (this.CurrentPage > 0) {
            this.CurrentPage--;
            this.recalcPagingUrl()
            this.LoadData();
        }
    }
    private nextPageClick() {
        if (this.CurrentPage < (this.allCount / this.pageSize) - 1) {
            this.CurrentPage++;
            this.recalcPagingUrl()
            this.LoadData();
        }
    }
    private lastPageClick() {
        this.CurrentPage = Math.ceil((this.allCount / this.pageSize)) - 1;
        this.recalcPagingUrl();
        this.LoadData();
    }

    private recalcPagingUrl() {
        this.urlPaging = '&$skip=' + (this.CurrentPage * this.pageSize) + '&$top=' + this.pageSize;
    }

    protected FilterButtonClick(e: any) {
        this.filteringOn = !this.filteringOn
        this.forceUpdate();
    }
    protected ApplyFiltersHandler(e: any) {
        this.urlFilters = e;
        this.LoadData();
    }

    protected toGridItem(items: JSX.Element[], id: number) {

        return <tr key={id}>
            {items.map((item, index) =>
                <td key={index} className="align-base">{item}</td>)
            }
            <td className="align-base">
                <NavLink to={this.URL_EDIT + id.toString()}
                    activeClassName='active'>
                    <span className="glyphicon glyphicon-edit dark" aria-hidden="true" />
                </NavLink>
                &nbsp;&nbsp;
                <div id={id.toString()}
                    role="button"
                    className="btn btn-sq-xs align-base"
                    onClick={(() => this.onDeleteClick(id)).bind(this)}>
                    <span className="glyphicon glyphicon-trash dark" aria-hidden="true" />
                </div>
            </td>
        </tr>
    }

    protected onDeleteClick(id: number) {
        if (this.CurrentPage != 0)
            if (this.allCount % this.pageSize === 1) {
                this.CurrentPage--;
                this.recalcPagingUrl();
            }

        fetch(this.URL_BASE + '/' + id,
            {
                method: 'DELETE',
                credentials: 'include',
            }).then(() => this.LoadData());
    }

    protected OrderBy(arg: string) {
        try {
            let data = this.state.items;

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




