import * as React from 'react';
import { StreamInvocationMessage } from '@aspnet/signalr';


export interface IFilterConfiguration {
    filterKey: string;
}
export interface empty { }

export abstract class Filter {

    public static readonly QUERY_HEAD: string = "&$filter="
    public static readonly CONSTRAIN_DIVIDER: string = " and "


    filterKey: string = "";
    onFilterChanged: Function;
    requesRedraw: Function;

    constructor(params: IFilterConfiguration) {
        this.filterKey = params.filterKey;
    }

    public abstract Reset(): void

    public abstract render(): JSX.Element
}