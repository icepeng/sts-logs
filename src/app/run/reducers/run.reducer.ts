import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { RunActions, RunActionTypes } from '../actions/run.action';
import { Run } from '../models/run.model';

export interface State extends EntityState<Run> {
    selectedRunId: string | null;
}

export const adapter: EntityAdapter<Run> = createEntityAdapter<Run>({
    selectId: (run: Run) => run.play_id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedRunId: null,
});

export function reducer(state = initialState, action: RunActions): State {
    switch (action.type) {
        case RunActionTypes.Load: {
            return {
                ...adapter.addMany(action.payload, state),
                selectedRunId: state.selectedRunId,
            };
        }

        case RunActionTypes.Select: {
            return {
                ...state,
                selectedRunId: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedRunId;
