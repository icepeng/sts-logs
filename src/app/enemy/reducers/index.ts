import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromEnemy from './enemy.reducer';

export interface EnemyState {
    entities: fromEnemy.State;
}

export interface State extends fromRoot.State {
    enemy: EnemyState;
}

export const reducers = {
    entities: fromEnemy.reducer,
};

export const getEnemyState = createFeatureSelector<EnemyState>('enemy');

export const getEnemyEntitiesState = createSelector(
    getEnemyState,
    state => state.entities,
);

export const getEnemyEntities = createSelector(
    getEnemyEntitiesState,
    fromEnemy.getEnemies,
);

export const getSelectedEnemy = createSelector(
    getEnemyEntitiesState,
    fromEnemy.getSelectedEnemy,
);

export const getDamages = createSelector(
    getEnemyEntitiesState,
    fromEnemy.getDamages,
);

export const getKills = createSelector(
    getEnemyEntitiesState,
    fromEnemy.getKills,
);
