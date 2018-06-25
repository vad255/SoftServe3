import * as React from 'react';
import { Route } from 'react-router-dom';
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
import { TeamGrid } from './components/TeamGrid';


export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={Counter} />
    <Route path='/adduser' component={AddUser} />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/usergrid' component={UserGrid} />
    <Route path='/Sprints' component={SprintsGrid} />
    <Route path='/Stories' component={StoryGrid} />
    <Route path='/feature' component={FeatureGrid} />
    <Route path='/edituser' component={EditUser} />
    <Route path='/teamgrid' component={TeamGrid} />
</Layout>;
