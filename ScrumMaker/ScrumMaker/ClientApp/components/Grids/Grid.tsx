import * as React from 'react';
import * as Modal from 'react-modal';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { IDbModel, IFetchState } from '../Models/Abstraction';
import { NavLink } from 'react-router-dom'
import { Content } from 'react-bootstrap/lib/Tab';
import { Filter } from '../Filters/Filter';
import { ConfirmMadal } from '../ConfirmModal'
import { FiltersManager } from '../Filters/FiltersManager';
import { CreateBtn } from "../ForAdmin/CreateButton";

export abstract class Grid extends React.Component<RouteComponentProps<{}>, IFetchState> {

    protected isLoading: boolean = true;
    protected abstract headerText: string;

    protected readonly abstract URL_BASE: string;
    protected readonly abstract URL_EXPANDS: string;
    protected readonly abstract URL_ORDERING: string;
    private readonly URL_COUNT: string = '&$count=true';
    protected readonly URL_EDIT: string = "!!!NOT_IMPLEMENTED!!!/";
    protected readonly URL_NEW: string = "!!!NOT_IMPLEMENTED!!!/";

    protected readonly FILTER_MANAGER_REF = "FilterManager";
    protected customUrlFilters: string = '';
    protected filteringOn: boolean = false;
    private urlFilters: string = '';
    private urlPaging: string = ""; 
    private CurrentPage = 0;
    private totalCount = 0;

    private itemToDelete: number = -1;
    private lastOrderingArg: string = '';
    private lastOrderingDir: boolean = false;

    constructor() {
        super();
        this.state = { pageSize: 5, items: [], ConfirmModal: false, modalMessage: "" };
        this.recalcPagingUrl(this.state.pageSize);
        this.readQueryParams();  
        this.isLoading = true;
    }

    public render() {
        let createBtnState: boolean = true;
        if (window.location.pathname === "/usergrid") {
            createBtnState = false;
        }

        let contents = this.isLoading
            ? <tr><td colSpan={14}><p><em>Loading...</em></p></td></tr>
            : this.GetBodyRows();

        return (
            <div>
                
                <div className="RDiv">

                    <h1 style={{ width: "90%" }}>{this.headerText}</h1>

                    <div style={{ marginBottom: "10px" }}>
                        {createBtnState ? <CreateBtn URL={this.URL_NEW} /> : null}
                    </div>
                </div>
                <div>
                    <label>Number elements:
                        <select style={{ marginLeft: "5px", height: "25px" }} onChange={this.handleSizeSelect.bind(
                            this)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </label>
                </div>

                <div>
                    <table className='table table-scrum table-hover td-scrum' style={{ marginTop: "1px" }}>

                        <thead>
                            {this.GetHeaderRow()}
                            {this.GetFiltersRow()}
                        </thead>
                        <tbody>
                            {contents}
                        </tbody>
                        <tfoot>
                            {this.GetFooterRow()}
                        </tfoot>
                    </table>
                    {this.GetDeleteConfirmModal()}

                    <Modal isOpen={this.state.ConfirmModal}
                        onRequestClose={this.openCloseModel}
                        className="Modal">
                        <h3>{this.state.modalMessage}</h3>
                        <button className="modalBtn" onClick={this.openCloseModel}>Ok</button>
                    </Modal>
                </div>
            </div>
        );
    }

    openCloseModel = () => {
        this.setState({
            ConfirmModal: !this.state.ConfirmModal
        })
    }

    protected LoadData() {
        fetch(this.getURL(this.state.pageSize), { credentials: 'include' })
            .then(response => {
                if (response.url.indexOf('login') !== -1) {
                    this.props.history.push('/login');      // Go to loginPage;
                } else {
                    let data = response.json();             // parse data
                    data.then(data => {
                        this.totalCount = data['@odata.count'];
                        this.OnDataReceived(data);
                    });
                }
            }).catch(e => this.onCatch(e));
    }

    componentDidMount() {
        this.LoadData();
    }

    protected OnDataReceived(data: any): void {
        this.isLoading = false;

        let itemsTemp: IDbModel[] = [];
        for (var i = 0; i < data['value'].length; i++)
            itemsTemp[i] = this.instantiate(data["value"][i]);

        this.setState({ items: itemsTemp });
    }

    protected onCatch(e: any) {
        this.props.history.push('/Error');
    }

    protected getURL(sizePage: number) {

        this.updateFilterUrl();

        let result = this.URL_BASE;

        result += this.URL_EXPANDS;

        result += this.urlFilters;

        result += this.URL_ORDERING;

        result += this.recalcPagingUrl(sizePage);

        result += this.URL_COUNT;

        return result;
    }

    updateFilterUrl(): any {
        let manager = this.refs[this.FILTER_MANAGER_REF] as FiltersManager;

        if (manager)
            this.urlFilters = manager.GetFilteringQuery();
        else
            this.urlFilters = "";
    }

    recalcPagingUrl(pageSize: number) {

        if (this.totalCount < pageSize)
            return '&$top=' + pageSize;
        else
            return '&$skip=' + (this.CurrentPage * pageSize) + '&$top=' + pageSize;
    }

    protected abstract instantiate(item: any): IDbModel;

    protected abstract GetHeaderRow(): JSX.Element;
    protected abstract GetFiltersRow(): JSX.Element;

    protected GetBodyRows(): JSX.Element[] {

        return this.state.items.map((s) => this.toGridItem(s.toArray(), s.getId()));
    }

    private GetFooterRow() {
        if (this.totalCount <= this.state.pageSize) {
            return <tr></tr>;
        }

        return <tr>
            <td colSpan={14}>
                <div className="text-center">
                    <div role='button' className='btn btn-sq-xs align-base' onClick={this.firstPageClick.bind(this)}>
                        <span className="glyphicon glyphicon-step-backward dark"></span>
                    </div>
                    <div role='button' className='btn btn-sq-xs align-base' onClick={this.previousPageClick.bind(this)}>
                        <span className="glyphicon glyphicon-chevron-left dark"></span>
                    </div>
                    {Math.ceil(this.CurrentPage + 1)} of {Math.ceil(this.totalCount / this.state.pageSize)}
                    <div role='button' className='btn btn-sq-xs align-base' onClick={this.nextPageClick.bind(this)}>
                        <span className="glyphicon glyphicon-chevron-right dark"></span>
                    </div>
                    <div role='button' className='btn btn-sq-xs align-base'
                        onClick={this.lastPageClick.bind(this)}>
                        <span className="glyphicon glyphicon-step-forward dark"></span>
                    </div>
                </div>
            </td>
        </tr>;
    }

    handleSizeSelect(event: any) {

        fetch(this.getURL(event.target.value), { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                this.OnDataReceived(data);
            }).catch(e => this.onCatch(e));
        this.setState({ pageSize: event.target.value });
    }

    private GetDeleteConfirmModal() {
        let title = "Are you sure you want to delete this item?";

        return <ConfirmMadal
            onCanceled={this.onDeleteCancel.bind(this)}
            onConfirmed={this.onDeleteConfirmed.bind(this)}
            title={title}
            id={"ConfirmDeleteDialog"} />;
    }

    private firstPageClick() {
        this.CurrentPage = 0;
        this.LoadData();
    }

    private previousPageClick() {
        if (this.CurrentPage > 0) {
            this.CurrentPage--;
            this.LoadData();
        }
    }

    private nextPageClick() {
        if (this.CurrentPage < (this.totalCount / this.state.pageSize) - 1) {
            this.CurrentPage++;
            this.LoadData();
        }
    }

    private lastPageClick() {
        this.CurrentPage = Math.ceil((this.totalCount / this.state.pageSize)) - 1;
        this.LoadData();
    }

    protected FilterButtonClick(e: any) {
        this.filteringOn = !this.filteringOn;
        this.forceUpdate();
    }

    protected ApplyFiltersHandler(e: any) {
        this.urlFilters = e;
        this.LoadData();
    }

    private setItemToDelete(id: number) {
        this.itemToDelete = id;
    }

    protected onDeleteConfirmed() {
        if (this.CurrentPage == (Math.ceil(this.totalCount / this.state.pageSize) - 1))
            if (this.totalCount % this.state.pageSize === 1) {
                this.CurrentPage--;
                this.recalcPagingUrl(this.state.pageSize);
            }

        fetch(this.URL_BASE + '/' + this.itemToDelete,
            {
                method: 'DELETE',
                credentials: 'include',
            
            }).then(response => response.json() as any)
            .then(data => {

                data.value == false ? this.setState({ modalMessage: "The Item successfully deleted", ConfirmModal: true })
                                    : this.setState({ modalMessage: "Current Item doesn't exist", ConfirmModal: true });
                
                this.LoadData();
            });
    }    

    protected onDeleteCancel() {
        this.itemToDelete = -1;
    }

    protected toGridItem(items: JSX.Element[], id: number) {
        return (
            <tr key={id}>
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
                        onClick={(() => this.setItemToDelete(id)).bind(this)}
                        data-toggle="modal"
                        data-target="#ConfirmDeleteDialog"
                        className="btn btn-sq-xs align-base">
                        <span className="glyphicon glyphicon-trash dark" aria-hidden="true" />
                    </div>
                </td>
            </tr>
        );
    }

    protected OrderBy(arg: string) {

        try {
            let data = this.state.items;

            if (this.lastOrderingArg === arg)
                this.lastOrderingDir = !this.lastOrderingDir;
            else
                this.lastOrderingDir = false;

            if (!this.lastOrderingDir)
                data.sort((a, b) => this.SafeCompare(a, b, arg));
            else
                data.sort((a, b) => -this.SafeCompare(a, b, arg));

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

    private readQueryParams() {
        let params = this.GetUrlParams();

        if (!params)
            return;

        for (let iterator in params) {
            this.customUrlFilters += params[iterator];
        }
    }

    private GetUrlParams(): any[] {
        let vars: any = {};
        let queryBegin = window.location.href.indexOf('?');

        if (queryBegin < 0)
            return [];

        let paramsSection = window.location.href.slice(queryBegin + 1);

        let hashes = paramsSection.split("&");
        let keyVal: string[] = [];
        for (var i = 0; i < hashes.length; i++) {
            keyVal = hashes[i].split('=');
            if (!keyVal[0] || !keyVal[1])
                return [];
            vars[keyVal[0]] = keyVal[1];
        }
        return vars;
    }
}
