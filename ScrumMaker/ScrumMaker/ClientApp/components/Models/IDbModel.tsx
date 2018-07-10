import 'isomorphic-fetch';

export interface IFetchState{
    items: IDbModel[]
}

export interface IDbModel {
    getId() : number;
    toArray() : any[];
}


