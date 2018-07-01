import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { AddUser } from './components/AddUser';
import { SprintsGrid } from './components/Grids/SprintsGrid';
import { UserGrid } from './components/Grids/UserGrid';
import { StoriesGrid } from './components/Grids/StoriesGrid';
import { FeatureGrid } from './components/Grids/FeatureGrid';
import { EditUser } from './components/EditUser';
import { Login } from './components/Login'
import { TeamGrid } from './components/Grids/TeamGrid';
import { DefectGrid } from './components/DefectGrid';
import { Error } from './components/Error';

const LayoutRoute = ({ ...props }) => {
    return (
        <Layout>
            <Route {...props} />
        </Layout>
    );
};

export const routes = <BrowserRouter >
    <Switch>
        <LayoutRoute exact path='/' component={Home} />
        <LayoutRoute path='/counter' component={Counter} />
        <LayoutRoute path='/adduser' component={AddUser} />
        <LayoutRoute path='/fetchdata' component={FetchData} />
        <LayoutRoute path='/usergrid' component={UserGrid} />
        <LayoutRoute path='/Sprints' component={SprintsGrid} />
        <LayoutRoute path='/Stories' component={StoriesGrid} />
        <LayoutRoute path='/feature' component={FeatureGrid} />
        <LayoutRoute path='/editUser' component={EditUser} />
        <LayoutRoute path='/teamgrid' component={TeamGrid} />
        <LayoutRoute path='/defects' component={DefectGrid} />
        <Route path='/login' component={Login} />
        <Route path='/Error' component={Error} />
    </Switch>
</BrowserRouter  >;

