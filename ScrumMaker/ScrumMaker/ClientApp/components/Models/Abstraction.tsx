import 'isomorphic-fetch';


export interface ICommitableDbModel extends IDbModel {
    getUpdateModel(): object;
}

export interface IFetchState {
    items: IDbModel[];
    pageSize: number;
    ConfirmModal: boolean;
    modalMessage: string;
}

export interface IDbModel {
    getId(): number;
    toArray(): any[];
}


