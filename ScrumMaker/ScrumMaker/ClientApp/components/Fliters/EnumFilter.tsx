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

    private OnChangeHandler(e: any) {

        this.filteringString = "";

        for (let i = 0; i < e.target.options.length; i++) {

            let enumVal = e.target.options[i]


            if (!enumVal.selected)
                continue;

            if (this.filteringString.length != 0)
                this.filteringString += ' or '

            this.filteringString +=
                this.state.filterKey.toString() +' eq \'' +
                enumVal.value.toString() +
                '\'';
        }
        this.state.onFilterChanged(this.state.filterKey, '(' + this.filteringString + ')');
    }

    public render() {
        return <div className="dropdown">
            <div data-toggle="dropdown" >
                Selector<span className="caret"></span>
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


        return <select className="dropdown-menu autooverflow" multiple={true}
            onChange={this.OnChangeHandler.bind(this)}>
            {items}
        </select>

    }
}