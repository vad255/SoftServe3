import * as React from 'react';
import { Filter, IFilterConfiguration } from './Filter'
import { FormControl } from 'react-bootstrap';

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
        this.label = selectedCount === 0 ?
            "All" :
            selectedCount === 1 ?
                selectedCount + ' type' :
                selectedCount + ' types';

        this.forceUpdate();
        this.state.onFilterChanged(this.state.filterKey, '(' + this.filteringString + ')');
    }



    onDpopdownClick() {
        this.dispalyItems = !this.dispalyItems;
        this.forceUpdate();
    }

    public render() {
        return <div className="dropdown">
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
            className={this.dispalyItems ?
                "dropdown-menu autooverflow display" :
                "dropdown-menu autooverflow"}
            multiple={true}
            onChange={this.OnChangeHandler.bind(this)}>
            {items}
        </select>

    }
}