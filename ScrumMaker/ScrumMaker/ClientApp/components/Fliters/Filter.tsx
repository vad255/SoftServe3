import * as React from 'react';


export interface IFilterConfiguration {
    filterKey: string;
    onFilterChanged: Function;
}


export abstract class Filter extends React.Component<IFilterConfiguration, IFilterConfiguration> {

    public static readonly QUERY_HEAD: string = "&$filter="
    public static readonly CONSTRAIN_DIVIDER: string = " and "

    constructor(params: IFilterConfiguration) {
        super();
        this.state = { onFilterChanged: params.onFilterChanged, filterKey: params.filterKey }
    }

    public Reset() {
        this.forceUpdate();
    }

    public render() {
        return <input type="text" />
    }
}