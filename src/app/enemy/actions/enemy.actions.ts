import { Action } from '@ngrx/store';

export enum EnemyActionTypes {
    Select = '[Enemy] Select',
}

export class Select implements Action {
    readonly type = EnemyActionTypes.Select;

    constructor(public payload: string) {}
}

export type EnemyActions = Select;
