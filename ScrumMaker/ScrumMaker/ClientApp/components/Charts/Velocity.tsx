import * as React from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart } from 'recharts';
import { ModelForChart } from '../Models/ModelForChart';

interface DataFetchingState {
    data: ModelForChart[];
}

export class Velocity extends React.Component<DataFetchingState, DataFetchingState> {
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
                margin={{ top: 13, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" tickLine={false} />
                <Legend />
                <CartesianGrid stroke='#f5f5f5' vertical={false} />
                <Bar dataKey="completedTask" fill='green' isAnimationActive={false} />
                <Bar dataKey="remainingTask" fill='yellow' isAnimationActive={false} />
                <Tooltip />
            </ComposedChart>
        );
    }
}

