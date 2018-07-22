import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AddUser } from './components/AddUser';
import { SprintsGrid } from './components/Grids/SprintsGrid';
import { UserGrid } from './components/Grids/UserGrid';
import { StoriesGrid } from './components/Grids/StoriesGrid';
import { FeatureGrid } from './components/Grids/FeatureGrid';
import { EditUser } from './components/EditUser';
import { Login } from './components/Login'
import { TeamGrid } from './components/Grids/TeamGrid';
import { DefectGrid } from './components/Grids/DefectGrid';
import { TaskGrid } from './components/Grids/TaskGrid';
import { FeatureEdit } from './components/EditPages/FeatureEdit';
import { Error } from './components/Error';
import { SimpleChat } from './components/Chats/SimpleChat'
import { Chart } from './components/Charts/Chart'
import { SprintReviewEdit } from './components/Meetings/SprintReviewEdit';
import { EditStory } from "./components/EditPages/EditStory";
import { UserEdit } from "./components/EditPages/UserEdit";
import { EditDefect } from "./components/EditPages/EditDefect";
import { MyCalendar } from "./components/MyCalendar";
import { SprintEdit } from './components/EditPages/SprintEdit';
import { SprintPlaning } from './components/Meetings/SprintPlaning'
import { TaskEdit } from './components/EditPages/TaskEdit';
import { Velocity } from './components/Charts/Velocity';
import { EditTeam } from './components/EditPages/EditTeam';
import { RetrospectiveMeeting } from './components/Chats/RetrospectiveMeeting';
import { SelectSprintPage } from './components/Chats/RetrospectivePages/SelectSprintPage';
import { SelectSprint } from './components/Meetings/SelectSprint';


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
        <LayoutRoute path='/adduser' component={AddUser} />
        <LayoutRoute path='/usergrid' component={UserGrid} />
        <LayoutRoute path='/Sprints' component={SprintsGrid} />
        <LayoutRoute path='/Stories' component={StoriesGrid} />
        <LayoutRoute path='/feature' component={FeatureGrid} />
        <LayoutRoute path='/editUser' component={EditUser} />
        <LayoutRoute path='/teamgrid' component={TeamGrid} />
        <LayoutRoute path='/defects' component={DefectGrid} />
        <LayoutRoute path='/tasks' component={TaskGrid} />
        <LayoutRoute path='/featureEdit' component={FeatureEdit} />
        <LayoutRoute path='/SimpleChat' component={SimpleChat} />
        <LayoutRoute path='/Chart' component={Chart} />
        <LayoutRoute path='/EditStory' component={EditStory} />
        <LayoutRoute path='/SprintReviewEdit' component={SprintReviewEdit} />
        <LayoutRoute path='/UserEdit' component={UserEdit}/>
        <LayoutRoute path='/Calendar' component={MyCalendar} />
        <LayoutRoute path='/SelectSprint' component={SelectSprint} />
        <LayoutRoute path='/SprintEdit' component={SprintEdit} />
        <LayoutRoute path='/SprintPlaning' component={SprintPlaning} />
        <LayoutRoute path='/TaskEdit' component={TaskEdit} />
        <LayoutRoute path='/VelocityChart' component={Velocity} />
        <LayoutRoute path='/EditTeam' component={EditTeam} />
        <LayoutRoute path='/EditDefect' component={EditDefect} />
        <LayoutRoute path='/RetrospectiveMeeting' component={RetrospectiveMeeting} />
        <LayoutRoute path='/SelectSprintPage' component={SelectSprintPage} />

        <Route path='/login' component={Login} />
        <Route path='/Error' component={Error} />
    </Switch>
</BrowserRouter  >;

