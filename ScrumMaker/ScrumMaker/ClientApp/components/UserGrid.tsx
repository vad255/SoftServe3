
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface UserState {
    forecasts: User[];
    loading: boolean;
}

export class UserGrid extends React.Component<RouteComponentProps<{}>, UserState> {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };

        fetch('api/UserGrid/GetUser')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : UserGrid.renderForecastsTable(this.state.forecasts);

        return <div>
            <h1>User Grid</h1>
            <p>This component demonstrates userGrid from the database.</p>
            {contents}
        </div>;
    }

    private static renderForecastsTable(forecasts: User[]) {
        return <table className='table table-hover table-dark'>
            <thead>
                <tr>
                    <th>UserId</th>
                    <th>Login</th>
                    <th>Password</th>
                    <th>RoleId</th>
                    <th>Activity</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.userId}>
                        <td>{forecast.userId}</td>
                        <td>{forecast.login}</td>
                        <td>{forecast.password}</td>
                        <td>{forecast.roleId}</td>
                        <td>{String(forecast.activity)}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface User {
    userId: number;
    login: string;
    password: string;
    roleId: number;
    activity: boolean;
}
