import { Action } from '@ngrx/store';

export enum CardActionTypes {
    Select = '[Card] Select',
}

export class Select implements Action {
    readonly type = CardActionTypes.Select;

    constructor(public payload: string) {}
}

export type CardActions = Select;
