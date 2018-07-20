﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Story } from 'ClientApp/components/Models/Story';
import { ListGroupItem } from 'react-bootstrap';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';



export class ProductBacklog {

    public URL_BASE: string = '/odata/stories?$filter=SprintId eq null&$expand=Tasks($select=TaskId,Summary,Description)&$select=Id,Name';
    public stories: Story[] = [];

    getList() {
        return <div>
            <Tabs forceRenderTabPanel>
                <div className="col-xs-3">
                    <TabList className="nav nav-tabs tabs-left sideways">
                        {this.stories.map(x => <Tab key={x.id} className="btn tab-story">{x.name}</Tab>)}
                    </TabList>
                </div>
                <div className="col-xs-3 tab-context">
                    {this.stories.map(x => <TabPanel key={x.id}>
                        <Tabs forceRenderTabPanel>
                            <div className="col-xs-9">
                                <TabList className="nav nav-tabs tabs-left sideways">
                                    {x.tasks.map(t => <Tab key={t.taskId} className="btn tab-sub-task">{t.summary}</Tab>)}
                                </TabList>
                            </div>
                            <div className="tab-task-descrip">
                                {x.tasks.map(t => <TabPanel key={t.taskId}>
                                    <ListGroupItem>
                                        {t.description}
                                    </ListGroupItem>
                                </TabPanel>)}
                            </div>
                        </Tabs>
                    </TabPanel>)}
                </div>
            </Tabs>
        </div>
    }
}