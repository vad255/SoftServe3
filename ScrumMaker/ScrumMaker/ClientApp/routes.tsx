import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { AddUser } from './components/AddUser';
import { SprintsGrid } from './components/SprintsGrid';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={Counter} />
    <Route path='/adduser' component={AddUser} />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/Sprints' component={ SprintsGrid }/>
</Layout>;
