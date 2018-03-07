import { Action } from '@ngrx/store';
import { Run } from '..//models/run.model';

export enum RunActionTypes {
    Load = '[Run] Load',
    Select = '[Run] Select',
}

export class Load implements Action {
    readonly type = RunActionTypes.Load;

    constructor(public payload: Run[]) {}
}

export class Select implements Action {
    readonly type = RunActionTypes.Select;

    constructor(public payload: string) {}
}

export type RunActions = Load | Select;
