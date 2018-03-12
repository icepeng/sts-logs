import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromCard from './card.reducer';

export interface CardState {
    entities: fromCard.State;
}

export interface State extends fromRoot.State {
    card: CardState;
}

export const reducers = {
    entities: fromCard.reducer,
};

export const getCardState = createFeatureSelector<CardState>('card');

export const getCardEntitiesState = createSelector(
    getCardState,
    state => state.entities,
);

export const getCardEntities = createSelector(
    getCardEntitiesState,
    fromCard.getCards,
);

export const getSelectedCard = createSelector(
    getCardEntitiesState,
    fromCard.getSelectedCard,
);

export const getAllRunCard = createSelector(
    getCardEntitiesState,
    fromCard.getRunCard,
);
