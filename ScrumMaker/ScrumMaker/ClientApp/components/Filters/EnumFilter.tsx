import * as React from 'react';
import { Filter, IFilterConfiguration } from './Filter'

export interface IEnumFilterConfiguration extends IFilterConfiguration {
    enumType: any;
}

export class EnumFilter extends Filter {
    constructor(params: IEnumFilterConfiguration) {
        super(params);
        this.enumType = params.enumType;

        for (let iterator in this.enumType) {
            if (!parseInt(iterator))
                this.enumNames.push(iterator.toString());
        }
    }

    enumType: {} = [];
    filteringString: string = '';
    label: string = 'All'
    dispalyItems: boolean = false;

    enumNames: string[] = [];

    public Reset(): void {
        let selects = document.getElementById(this.filterKey + "Filter") as any;
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
                this.filterKey.toString() + ' eq \'' +
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

        if (this.requesRedraw) this.requesRedraw();
        this.onFilterChanged(this.filterKey, this.filteringString);
    }

    onDpopdownClick() {
        this.dispalyItems = !this.dispalyItems;
        this.requesRedraw();
    }

    onMouseLeave() {
        this.dispalyItems = false;
        this.requesRedraw();
    }

    onMouseEnter() {
        this.dispalyItems = true;        
        this.requesRedraw();
    }

    public render() {      
        return <div className="dropdown"
            onMouseLeave={this.onMouseLeave.bind(this)}
        //    onMouseEnter={this.onMouseEnter.bind(this)}
        >
            <div className="light" onClick={this.onDpopdownClick.bind(this)}>
                {this.label}<span className="caret"></span>
            </div>
            {this.renderSelect()}
        </div>



    }

    private renderSelect() {

        let items: JSX.Element[] = [];
        for (var i = 0; i < this.enumNames.length; i++) {
            items.push(<option key={i + 1} value={this.enumNames[i]}>{this.enumNames[i]}</option>);
        }

        return <select
            id={this.filterKey + "Filter"}
            className={this.dispalyItems ?
                "dropdown-menu autooverflow display" :
                "dropdown-menu autooverflow"}
            multiple={true}
            onChange={this.OnChangeHandler.bind(this)}>
            {items}
        </select>

    }
}