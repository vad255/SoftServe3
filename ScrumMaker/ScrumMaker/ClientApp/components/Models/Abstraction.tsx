import 'isomorphic-fetch';


export interface ICommitableDbModel extends IDbModel {
    getUpdateModel(): object;
}

export interface IFetchState {
    items: IDbModel[]
}

export interface IDbModel {
    getId(): number;
    toArray(): any[];
}


