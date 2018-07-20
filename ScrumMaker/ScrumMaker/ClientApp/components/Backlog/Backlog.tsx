import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Story } from '../Models/Story';
import { ProductBacklog } from './productBacklog';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { SprintBacklog } from './SprintBacklog';
import { Sprint } from '../Models/Sprint';

export class Backlog extends React.Component<RouteComponentProps<{}>, any> {
    public productBacklog: ProductBacklog = new ProductBacklog();
    public sprintBacklog: SprintBacklog = new SprintBacklog();

    constructor() {
        super();
        this.loadProductBacklog();
        this.loadSprintBacklog();

        this.state = {
            storiesProd: [],
            sprints: [],
        }
    }

    loadProductBacklog() {
        fetch(this.productBacklog.URL_BASE, { credentials: "include" })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let tempProd: Story[] = [];
                for (var i = 0; i < data["value"].length; i++) {
                    tempProd.push(new Story(data["value"][i]));
                }
                this.productBacklog.stories = tempProd;
                this.setState({ storiesProd: tempProd });
            })
    }
    loadSprintBacklog() {
        fetch(this.sprintBacklog.URL_BASE, { credentials: "include" })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let tempSprint: Sprint[] = [];
                for (var i = 0; i < data["value"].length; i++) {
                    tempSprint.push(new Sprint(data["value"][i]));
                }
                this.sprintBacklog.sprints = tempSprint;
                this.setState({ sprints: tempSprint });
            })
    }

    render() {
        return <div>
            <Tabs forceRenderTabPanel>
                <TabList>
                    <Tab className="btn tab-menu"><div id="tab-menu-div">Product Backlog</div></Tab>
                    <Tab className="btn tab-menu"><div id="tab-menu-div">Sprint Backlog</div></Tab>
                </TabList>
                <TabPanel>
                    <div id="listitem">
                        {this.productBacklog.getList()}
                    </div>
                </TabPanel>
                <TabPanel>
                    {this.sprintBacklog.getSprints()}
                </TabPanel>
            </Tabs>
        </div>
    }
}