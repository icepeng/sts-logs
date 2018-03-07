import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromRun from './run.reducer';

export interface RunState {
    run: fromRun.State;
}

export interface State extends fromRoot.State {
    run: RunState;
}

export const reducers = {
    run: fromRun.reducer,
};

export const getRunState = createFeatureSelector<RunState>('run');

export const getRunEntitiesState = createSelector(
    getRunState,
    state => state.run,
);

export const getSelectedRunId = createSelector(
    getRunEntitiesState,
    fromRun.getSelectedId,
);

export const {
    selectIds: getRunIds,
    selectEntities: getRunEntities,
    selectAll: getAllRuns,
    selectTotal: getTotalRuns,
} = fromRun.adapter.getSelectors(getRunEntitiesState);

export const getSelectedRun = createSelector(
    getRunEntities,
    getSelectedRunId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    },
);
