import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { User } from '../Models/User';
import { Filter, IFilterConfiguration } from '../Filters/Filter'
import { TextFilter } from '../Filters/TextFilter'
import { IntFilter } from '../Filters/IntFilter'
import { EnumFilter } from '../Filters/EnumFilter'
import { BoolFilter } from '../Filters/BoolFilter'

interface UserDataFetchingState {
    users: User[];
    filters: any;
    loading: boolean;
}

export class UserGrid extends React.Component<RouteComponentProps<{}>, UserDataFetchingState> {

    static readonly URL_BASE: string = 'odata/users';
    static readonly URL_EXPANDS: string = '?$expand=Role,Team($expand=members)'
    static readonly URL_ORDERING: string = ''

    constructor() {
        super();
        this.state = { users: [], loading: true, filters: [] };

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
                var usersTemp = [];
                for (var i = 0; i < data['value'].length; i++) {
                    usersTemp[i] = new User(data["value"][i]);
                }
                this.setState({ users: usersTemp, loading: false, filters: this.state.filters });
            });
    }

    private renderUsersTable(users: User[]) {

        return <table className='table table-scrum table-hover td-scrum'>
            {this.GetHeader()}
            {this.getFiltersLine()}
            <tbody>
                {this.state.users.map(s => s.renderAsTableRow())}
            </tbody>
            <tfoot>
                {this.RenderFooter()}
            </tfoot>
        </table>

    }

    private GetHeader() {
        return <thead>
            <tr>
                <th className="well menu_links col-md-1" onClick={() => this.OrderBy("userId")}><span className="nowrap">Database ID</span></th>
                <th className="well menu_links col-md-1" onClick={() => this.OrderBy("login")}>Login</th>
                <th className="well menu_links col-md-1" onClick={() => this.OrderBy("password")}>Password</th>
                <th className="well menu_links col-md-1" onClick={() => this.OrderBy("teamId")}>TeamId</th>
                <th className="well menu_links col-md-1" onClick={() => this.OrderBy("activity")}>Activity</th>
                <th className="well menu_links col-md-1" onClick={() => this.OrderBy("roleId")}>RoleId</th>
                <th className="well menu_links col-md-1">
                    <div onClick={this.FilterButtonClick.bind(this)}>
                        <span className="nowrap">Show Filters<span className="caret"></span></span>
                    </div>
                </th>
            </tr>
        </thead>;
    }

    private getFiltersLine() {
        return <tr className={this.fileteringOn ? "" : "nodisplay"}>
            <td>
                <IntFilter filterKey='userId' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='login' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='password' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='team/name' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td >
                <BoolFilter filterKey='activity' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='role/name' onFilterChanged={this.FilterChanged.bind(this)} />
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
        var result = UserGrid.URL_BASE;
        result += UserGrid.URL_EXPANDS;
        if (this.filterString != '')
            result += this.filterString;
        result += UserGrid.URL_ORDERING;
        return result;
    }

    private FilterChanged(key: string, filter: string) {

        this.state.filters[key] = filter;
    }

    private ApplyFiltersClick(e: any) {
        this.filterString = Filter.QUERY_HEAD;
        var i = 0;
        for (let iterator in this.state.filters) {
            if (this.state.filters[iterator] === '') {
                continue;
            }
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
        (document.getElementById("userIdFilter") as any).value = '';
        (document.getElementById("loginFilter") as any).value = '';
        (document.getElementById("passwordFilter") as any).value = '';
        (document.getElementById("teamIdFilter") as any).value = '';
        (document.getElementById("activityFilter") as any).value = '';
        (document.getElementById("roleIdFilter") as any).value = '';
    }

    private FilterButtonClick(e: any) {
        this.fileteringOn = !this.fileteringOn
        this.forceUpdate();
    }

    private OrderBy(arg: string) {
        try {
            var usersN = [];
            usersN = this.state.users as any[];


            if (this.lastOrderingArg === arg)
                this.lastOrderingDir = !this.lastOrderingDir;
            else
                this.lastOrderingDir = false;


            if (!this.lastOrderingDir)
                usersN.sort((a, b) => this.SafeCompare(a, b, arg))
            else
                usersN.sort((a, b) => -this.SafeCompare(a, b, arg))

            this.lastOrderingArg = arg;
            this.setState({ users: usersN as User[], loading: this.state.loading });
        } catch (e) {
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

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUsersTable(this.state.users);

        return <div>
            <h1>Users</h1>
            {contents}
        </div>
    }
}


