import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { AddUser } from './components/AddUser';
import { SprintsGrid } from './components/SprintsGrid';
import { UserGrid } from './components/UserGrid';
import { StoryGrid } from './components/StoryGrid';
import { FeatureGrid } from './components/FeatureGrid';
import { EditUser } from './components/EditUser';
import { Login } from './components/Login'

const LayoutRoute = ({ ...props }) => {
    return (
        <Layout>
            <Route {...props} />
        </Layout>
        );
};

export const routes = <BrowserRouter >
    <Switch>
            <LayoutRoute exact path='/' component={ Home } />


            <LayoutRoute path='/counter' component={Counter} />
            <LayoutRoute path='/adduser' component={AddUser} />
            <LayoutRoute path='/fetchdata' component={FetchData} />
            <LayoutRoute path='/usergrid' component={UserGrid} />
            <LayoutRoute path='/Sprints' component={SprintsGrid} />
            <LayoutRoute path='/Stories' component={StoryGrid} />
            <LayoutRoute path='/feature' component={FeatureGrid} />
            <LayoutRoute path='/editUser' component={EditUser} />
            <Route path='/login' component={Login} />
</Switch>
</BrowserRouter  >;
