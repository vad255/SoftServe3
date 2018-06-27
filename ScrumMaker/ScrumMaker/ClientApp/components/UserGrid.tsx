import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface UserState {
    roles: Role[];
    forecasts: User[];
    loading: boolean;
}

export class UserGrid extends React.Component<RouteComponentProps<{}>, UserState> {
    constructor() {
        super();
        this.state = { forecasts: [], roles: [], loading: true };

        fetch('api/UserGrid/GetUser')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
        fetch('api/UserGrid/GetRoles')
            .then(response => response.json() as Promise<Role[]>)
            .then(data => {
                this.setState({ roles: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.forecasts, this.state.roles);

        return <div>
            <h1>User Grid</h1>
            {contents}
        </div>;
    }

    private renderForecastsTable(forecasts: User[], roles: Role[]) {
        return <table className='table table-sml table-striped table-dark'>
            <caption>List of users</caption>
            <thead className=''>
                <tr>
                    <th scope="col">UserId</th>
                    <th scope="col">Login </th>
                    <th scope="col">Password</th>
                    <th scope="col">RoleId</th>
                    <th scope="col">Activity</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.userId}>
                        <th scope="row">{forecast.userId}</th>
                        <td>{forecast.login}</td>
                        <td>{forecast.password}</td>
                        {roles.map(role =>
                            role.roleId == forecast.roleId ? <td>{role.name}</td> : null
                        )}
                        <td>{String(forecast.activity)}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface Role {
    roleId: number;
    name: string;
}

interface User {
    userId: number;
    login: string;
    password: string;
    roleId: number;
    activity: boolean;
}
