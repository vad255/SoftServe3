﻿import * as React from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart } from 'recharts';
import { ModelForChart } from '../Models/ModelForChart';

interface DataFetchingState {
    data: ModelForChart[];
}

export class Chart extends React.Component<DataFetchingState, DataFetchingState> {
    constructor() {
        super();
        this.state = { data: [] };

        this.LoadData();
        this.test();
    }
    private LoadData() {
        fetch("/getdata", { credentials: 'include' })
            .then(response => response.json() as any)
            .then(data => {
                var temp = [];
                for (var i = 0; i < data.length; i++) {
                    temp[i] = new ModelForChart(data[i]);
                }
                this.setState({ data: temp });
            });
    }
    private test() {
        for (var i = 0; i < this.state.data.length; i++) {
            alert(this.state.data[i].completedTask);
        }
    }
    public render() {
        console.log(this.state.data);
        return (
            <ComposedChart width={900} height={450} data={this.state.data.map(x => x.props)}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" tickLine={false} />
                <YAxis dataKey="remainingTask" yAxisId="left" orientation='left' />
                <YAxis yAxisId="right" orientation='right'/>
                <Tooltip />
                <Legend />
                <CartesianGrid stroke='#f5f5f5' vertical={false} />
                <Bar yAxisId="left" dataKey='completedTask' barSize={40} fill='#F7B7B4' />
                <Line yAxisId="right" type="monotone" dataKey="remainingTask" stroke="#82ca9d" />
            </ComposedChart>
        );
    }
}

