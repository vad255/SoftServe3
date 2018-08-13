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
        return <div className="col-md-12">
            <Tabs forceRenderTabPanel className="row">
                <div className="col-md-2">
                    <TabList className="nav nav-tabs tabs-left ">
                        {this.sprints.map(
                            x => <Tab key={x.id} className="btn-dark scrum-btn tab-story">{x.name}</Tab>)
                        }
                    </TabList>
                </div>
                <div className="col-md-9">
                    {this.sprints.map(x => <TabPanel key={x.id}>
                        <Tabs forceRenderTabPanel className="row">
                            <div className="col-md-3">
                                <TabList className="nav nav-tabs tabs-left ">
                                    {x.backlog.map(
                                        t => <Tab key={t.id
                                        } data-toggle="tab" className="btn-dark scrum-btn  tab-story">{t.name}</Tab>)}
                                </TabList>
                            </div>
                            <div className="col-md-6">
                                {x.backlog.map(t => <TabPanel key={t.id}>
                                    <Tabs forceRenderTabPanel className="row">
                                        <div className="col-md-3">
                                            <TabList className="nav nav-tabs tabs-left">
                                                {t.tasks.map(
                                                    s => <Tab key={s.taskId
                                                    } data-toggle="tab" className="btn-dark scrum-btn tab-story">{s.summary}</Tab>)}
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
        </div>;
    }
}