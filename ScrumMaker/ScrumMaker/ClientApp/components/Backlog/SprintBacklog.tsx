import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Story } from '../Models/Story';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { Sprint } from '../Models/Sprint';



export class SprintBacklog {
    public sprints: Sprint[] = [];
    public URL_BASE: string = 'odata/sprints?$expand=backlog($select=Id,Name;$expand=Tasks($select=TaskId,Summary,Description))&$select=Id,Name';


    getSprints() {
        return <div className="col-sm-9">
            <Tabs forceRenderTabPanel>
                <div className="col-xs-3">
                    <TabList className="nav nav-tabs tabs-left sideways">
                        {this.sprints.map(x => <Tab key={x.id} className="btn tab-story">{x.name}</Tab>)}
                    </TabList>
                </div>
                <div className="col-xs-9">
                    {this.sprints.map(x => <TabPanel key={x.id}>
                        <Tabs forceRenderTabPanel>
                            <div className="col-xs-3">
                                <TabList className="nav nav-tabs tabs-left sideways">
                                    {x.backlog.map(t => <Tab key={t.id} data-toggle="tab" className="btn">{t.name}</Tab>)}
                                </TabList>
                            </div>
                            <div className="col-xs-9">
                                {x.backlog.map(t => <TabPanel key={t.id}>
                                    <Tabs forceRenderTabPanel>
                                        <div className="col-xs-3">
                                            <TabList className="nav nav-tabs tabs-left sideways">
                                                {t.tasks.map(s => <Tab key={s.taskId} data-toggle="tab" className="btn task-name">{s.summary}</Tab>)}
                                            </TabList>
                                        </div>
                                        <div id="desc-of-task">
                                            {t.tasks.map(s => <TabPanel key={s.taskId}>
                                                <div className="list-group-item">
                                                    {s.description}
                                                </div>
                                            </TabPanel>)}
                                        </div>
                                    </Tabs>
                                </TabPanel>)}
                            </div>
                        </Tabs>
                    </TabPanel>)}
                </div>
            </Tabs>
        </div>
    }
}