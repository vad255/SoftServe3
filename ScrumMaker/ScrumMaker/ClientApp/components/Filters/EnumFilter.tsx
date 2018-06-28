import * as React from 'react';
import { Filter, IFilterConfiguration } from './Filter'

export interface IEnumFilterConfiguration extends IFilterConfiguration {
    enumType: any;
}

export class EnumFilter extends Filter {
    constructor(params: IEnumFilterConfiguration) {
        super(params);
        this.enumType = params.enumType;
    }

    enumType: {} = [];
    filteringString: string = '';
    label: string = 'All'
    dispalyItems: boolean = false;

    public Reset(): void {
        let selects = document.getElementById(this.state.filterKey + "Filter") as any;
        for (let i = 0; i < selects.options.length; i++) {
            selects.options[i].selected = false;
        }
        this.filteringString = '';
        this.Update(0);
    }

    private OnChangeHandler(e: any) {
        this.filteringString = "";
        let selectedCount = 0;

        for (let i = 0; i < e.target.options.length; i++) {

            let enumVal = e.target.options[i]

            if (!enumVal.selected)
                continue;

            selectedCount++;

            if (selectedCount > 1)
                this.filteringString += ' or '

            this.filteringString +=
                this.state.filterKey.toString() + ' eq \'' +
                enumVal.value.toString() +
                '\'';
        }

        if (selectedCount !== 0)
            this.filteringString = '(' + this.filteringString + ')';

        this.Update(selectedCount);
    }



    private Update(selectedCount: number) {
        this.label = selectedCount === 0 ?
            "All" :
            selectedCount === 1 ?
                selectedCount + ' type' :
                selectedCount + ' types';
        this.forceUpdate();
        this.state.onFilterChanged(this.state.filterKey, this.filteringString);
    }

    onDpopdownClick() {
        this.dispalyItems = !this.dispalyItems;
        this.forceUpdate();
    }

    onMouseLeave() {
        this.dispalyItems = false;
        this.forceUpdate();
    }

    onMouseEnter() {
        this.dispalyItems = true;
        this.forceUpdate();
    }

    public render() {
        return <div className="dropdown"
            onMouseLeave={this.onMouseLeave.bind(this)}
            onMouseEnter={this.onMouseEnter.bind(this)}
        >
            <div className="light" onClick={this.onDpopdownClick.bind(this)}>
                {this.label}<span className="caret"></span>
            </div>
            {this.renderSelect()}
        </div>



    }

    private renderSelect() {
        let names: string[] = [];
        for (let iterator in this.enumType) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);
        }


        return <select
            id={this.state.filterKey + "Filter"}
            className={this.dispalyItems ?
                "dropdown-menu autooverflow display" :
                "dropdown-menu autooverflow"}
            multiple={true}
            onChange={this.OnChangeHandler.bind(this)}>

            {items}
        </select>

    }
}